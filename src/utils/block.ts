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
  _meta: { ownProps: {} };
  _eventBus: any;
  id: string;
  //ownProps: TBlockProps;

  constructor(propsAndChildren = {}) {
    const { children, ownProps, lists } = this._getChildrenAndList(propsAndChildren);
    this.children = children;
    this.lists = lists;

    const eventBus = new EventBus();

    this._meta = {
      ownProps,
    };

    this.id = makeUUID();
    this.props = this._makePropsProxy({ ...ownProps, id: this.id });
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

  _getChildrenAndList(propsAndChildren) {
    const children = {};
    const ownProps = {};
    const lists = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        ownProps[key] = value;
      }
    });

    return { children, ownProps, lists };
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

  _createDocumentElement(tagName) {
    const element = document.createElement(tagName);
    const { attr } = this.props;
    if (attr?.withInternalID) {
      element.setAttribute('data-id', this.id);
    }

    return element;
  }

  _render() {
    //const block = this.render();

    if (this.props.events && Object.keys(this.props.events).length !== 0) {
      this._removeEvents();
    }
    this._element.innerHTML = '';

    const firstElement = this.render().firstElementChild;
    if (this._element !== null) {
      this._element.replaceWith(firstElement);
    }
    this._element = firstElement;

    this._addEvents();
  }

  render() {}
  componentDidMount() {}

  getContent() {
    return this.element;
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(args) {
    let { oldProps, newProps } = { ...args };
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
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      propsAndStubs[key] = `<div data-id="${list.id}"></div>`;
    });

    const compiledTemplate = Handlebars.compile(template);
    const fragment = document.createElement('template');

    fragment.innerHTML = compiledTemplate({ ...propsAndStubs });

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
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

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName], true);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _makePropsProxy(props = {}) {
    const updateProps = (oldProps, newProps) => {
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, { oldProps, newProps });
    };

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
        const oldProps = { ...target };
        target[prop] = value;
        updateProps(oldProps, target);

        return true;
      },

      deleteProperty() {
        throw Error('Нет прав');
      },
    });

    return proxyProps;
  }
}
