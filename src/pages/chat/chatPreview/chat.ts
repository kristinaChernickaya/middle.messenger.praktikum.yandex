import { TProps } from '../../../types';
import Block from '../../../utils/block';
import * as Component from '../../../components';
import template from '../template.hbs?raw';

export default class ChatPreview extends Block {
  constructor(props: TProps) {
    const chatLeftSideBar = new Component.ChatLeftSideBar({});

    super({
      ...props,
      leftSideBar: chatLeftSideBar,
      contentCenter: 'Выберите чат чтобы отправить сообщение',
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
