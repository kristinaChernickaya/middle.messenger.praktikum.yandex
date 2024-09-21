import EventBus from './event-bus';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { TBlockProps, TProps } from '../types';
export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };
  _element: any = null;
  _meta: { tagName: string; props: {} };
  eventBus;
  _eventBus: any;
  id: string;
  props: TBlockProps;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this.id = makeUUID();

    this.props = this._makePropsProxy({ ...props, id: this.id });
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
    const element = document.createElement(tagName);
    const { attr } = this.props;
    if (attr?.withInternalID) {
      element.setAttribute('data-id', this.id);
    }

    return element;
  }

  _render() {
    const block = this.render();
    if (this.props.events && Object.keys(this.props.events).length !== 0) {
      this._removeEvents();
    }
    console.log(this._element);

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

  _componentDidUpdate() {
    //const response = this.componentDidUpdate(oldProps, newProps);

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    return true;
  }

  // componentDidUpdate(oldProps: any, newProps: any) {
  //   return true;
  // }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  compile(templ: string, props: TProps) {
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

  _makePropsProxy(props: TProps) {
    const proxyProps = new Proxy(props, {
      get(target, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop: string, value) {
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
