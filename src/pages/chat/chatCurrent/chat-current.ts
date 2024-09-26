import { TProps } from '../../../types';
import Block from '../../../utils/block';
import * as Component from '../../../components';
import template from '../template.hbs?raw';

export default class ChatCurrent extends Block {
  constructor(props: TProps) {
    const chatLeftSideBar = new Component.ChatLeftSideBar({});
    const chatUserTop = new Component.ChatUserTop({
      userName: 'Alex',
    });

    const chatterBlock = new Component.ChatterBlock({});
    const chatTypeBlock = new Component.ChatTypeBlock({});

    super({
      ...props,
      leftSideBar: chatLeftSideBar,
      topContainer: chatUserTop,
      bodyContainer: chatterBlock,
      footerContainer: chatTypeBlock,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
