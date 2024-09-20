import EventBus from './event-bus';
import Handlebars from 'handlebars';
export default class Block {
  props(props: any, nextProps: any) {
    throw new Error('Method not implemented.');
  }
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };
  _element: any = null;
  //_meta = null;

  _meta: { tagName: string; props: {} };
  eventBus: any;
  _eventBus: any;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }
  _registerEvents(eventBus: EventBus<unknown>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  get element() {
    return this._element;
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _render() {
    const block = this.render();
    if (Object.keys(this.props.events).length !== 0) {
      this._removeEvents();
    }
    this._element.innerHTML = block;
    this._addEvents();
  }
  render() {}

  getContent() {
    return this.element;
  }

  _componentDidMount() {
    this.componentDidMount();
  }
  componentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      return true;
    }

    return false;
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  compile(templ: string, props: any) {
    const compiledTemplate = Handlebars.compile(templ);
    const fragment = document.createElement('template');
    fragment.innerHTML = compiledTemplate({ ...props });

    return fragment.innerHTML;
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _makePropsProxy(props: any) {
    const proxyProps = new Proxy(props, {
      get(target, prop) {
        if (prop.indexOf('_') === 0) {
          throw Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop, value) {
        if (prop.indexOf('_') === 0 || !value) {
          throw Error('Нет прав');
        }

        target[prop] = value;
        return true;
      },

      deleteProperty() {
        throw Error('Нет прав');
      },
    });

    return proxyProps;
  }
}
