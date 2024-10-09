import * as Service from '../../../services';
import * as Component from '../../../components';
import { TProps } from '../../../types';
import template from '../template.hbs?raw';

export default class ChatPreview extends Service.Block {
  constructor(props?: TProps) {
    const chatLeftSideBar = new Component.ChatLeftSideBar();

    super({
      ...props,
      leftSideBar: chatLeftSideBar,
      contentCenter: 'Выберите чат чтобы отправить сообщение',
      blockLinks: new Component.BlockLinks({}),
    });
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
