import EventBus from './event-bus';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { TProps, TEvent, TAttr } from '../types';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };
  _element: HTMLElement | null = null;
  _meta: { props: {} };
  id: string = '';
  children: {};
  lists: {};
  props: TProps;
  eventBus: () => EventBus<unknown>;

  constructor(propsAndChildren = {}) {
    const { children, props, lists } = this._getChildrenAndList(propsAndChildren);
    this.children = children;
    this.lists = lists;

    const eventBus = new EventBus();

    this._meta = {
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

  _getChildrenAndList(propsAndChildren: TProps) {
    const children: {} & Partial<TProps> = {};
    const props: {} & Partial<TProps> = {};
    const lists: {} & Partial<TProps> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  get element() {
    return this._element;
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    return element;
  }

  _render() {
    this._removeEvents();
    this._element!.innerHTML = '';

    const firstElement = this.render().firstElementChild;
    this._element?.replaceWith(firstElement);
    this._element = firstElement;

    this._addEvents();
    this.addAttributes();
  }

  render() {}
  componentDidMount() {}

  getContent() {
    return this.element;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child?.dispatchComponentDidMount();
    });
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps !== newProps) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  compile(template: string, props: TProps) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child?.id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      propsAndStubs[key] = `<div data-id="${list?.id}"></div>`;
    });

    const compiledTemplate = Handlebars.compile(template);
    const fragment = document.createElement('template');

    fragment.innerHTML = compiledTemplate({ ...propsAndStubs });

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child?.id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, list]) => {
      const listContent = this._createDocumentElement('template');
      list.forEach((item) => {
        if (item instanceof Block) {
          listContent.content.append(item.getContent());
        } else {
          listContent.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="${list.id}"]`);
      if (stub) {
        stub.replaceWith(listContent.content);
      }
    });

    return fragment.content;
  }

  addAttributes() {
    const { attr = {} } = this.props;

    if (this.props.withInternalId) {
      this._element?.setAttribute('data-id', this.id);
    }

    Object.entries(attr as TAttr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events as TEvent).forEach((eventName) => {
      this._element?.addEventListener(eventName, (events as TEvent)[eventName], true);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events as TEvent).forEach((eventName) => {
      this._element?.removeEventListener(eventName, (events as TEvent)[eventName]);
    });
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }

  _makePropsProxy(props = {}) {
    // const updateProps = (oldProps, newProps) => {
    //   this.eventBus().emit(Block.EVENTS.FLOW_CDU, { oldProps, newProps });
    // };
    const self = this;
    const proxyProps = new Proxy(props, {
      get(target: TProps, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: TProps, prop: string, value) {
        if (prop.indexOf('_') === 0 || !value) {
          throw Error('Нет прав');
        }
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },

      deleteProperty() {
        throw Error('Нет прав');
      },
    });

    return proxyProps;
  }
}
