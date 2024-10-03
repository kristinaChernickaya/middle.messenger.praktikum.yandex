import { TProps } from '../../types';
import * as Component from '../../components';
import template from './template.hbs?raw';
import { Block } from '../../services';

export default class ChatLeftSideBar extends Block {
  constructor(props: TProps) {
    const chatsBlockProps = [
      {
        userName: 'Alex',
        userMessage: 'Привет!',
        date: '10:49',
        countMessage: '2',
      },
      {
        userName: 'Алёна',
        userMessage: 'Ну где ты? Жду тебя',
        date: '04:22',
      },
      {
        userName: 'Павел',
        userMessage: 'Как дела?',
        date: '12:41',
        countMessage: '3',
      },
    ];

    const chatsBlock = chatsBlockProps.map((chat) => {
      return new Component.chatBlock(chat);
    });

    const linkProfile = new Component.Link({
      text: 'Профиль >',
      href: '/',
      className: 'text-grey-color',
      events: {
        click: () => {
          console.log('event Профиль');
        },
      },
    });

    const searchInput = new Component.Input({
      className: 'search',
      placeholderText: 'Поиск',
      type: 'text',
      name: 'search',
      id: 'search',
    });
    super({
      ...props,
      linkProfile: linkProfile,
      searchInput: searchInput,
      chatsBlock: chatsBlock,
    });
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
