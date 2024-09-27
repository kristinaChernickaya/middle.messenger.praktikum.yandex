import { TProps } from '../../../types';
import Block from '../../../utils/block';
import * as Component from '../../../components';
import template from '../template.hbs?raw';
import { validateForm } from '../../../utils/validate';
import { getDataForm } from '../../../utils/get-data-form';

export default class ChatCurrent extends Block {
  constructor(props: TProps) {
    const chatLeftSideBar = new Component.ChatLeftSideBar({});
    const chatUserTop = new Component.ChatUserTop({
      userName: 'Alex',
    });

    const chatterBlock = new Component.ChatterBlock({});
    const chatForm = new Component.ChatForm({
      events: {
        submit: (event: Event) => {
          validateForm(event);
          if (validateForm(event)) {
            getDataForm(event);
          }
        },
      },
    });

    super({
      ...props,
      leftSideBar: chatLeftSideBar,
      topContainer: chatUserTop,
      bodyContainer: chatterBlock,
      footerContainer: chatForm,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
