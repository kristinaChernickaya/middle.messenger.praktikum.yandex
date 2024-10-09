import { ChatLeftSideBarType } from '../../types';
import * as Component from '../../components';
import template from './template.hbs?raw';
import { Block } from '../../services';
import { addActiveClass } from '../../utils';

export default class ChatLeftSideBar extends Block {
  constructor(props?: ChatLeftSideBarType) {
    const chatsBlockProps = [
      {
        userName: 'Alex',
        userMessage: 'Привет!',
        date: '10:49',
        countMessage: '2',
        events: {
          click: (event: Event) => {
            addActiveClass(event);
          },
        },
      },
      {
        userName: 'Алёна',
        userMessage: 'Ну где ты? Жду тебя',
        date: '04:22',
        events: {
          click: (event: Event) => {
            addActiveClass(event);
          },
        },
      },
      {
        userName: 'Павел',
        userMessage: 'Как дела?',
        date: '12:41',
        countMessage: '3',
        events: {
          click: (event: Event) => {
            addActiveClass(event);
          },
        },
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
    });
    console.log(linkProfile);
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
