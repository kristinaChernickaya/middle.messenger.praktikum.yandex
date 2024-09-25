import { TProps } from '../../../types';
import Block from '../../../utils/block';
import * as Component from '../../../components';
import template from '../template.hbs?raw';

export default class ProfileInfo extends Block {
  constructor(props: TProps) {
    const linksProps = [
      {
        link: new Component.Link({
          text: 'Изменить данные',
          href: '/',
          events: {
            click: () => {
              console.log('event Изменить данные');
            },
          },
        }),
      },
      {
        link: new Component.Link({
          text: 'Изменить пароль',
          href: '/',
          events: {
            click: () => {
              console.log('event Изменить пароль');
            },
          },
        }),
      },
      {
        link: new Component.Link({
          text: 'Выйти',
          href: '/',
          className: 'text-red-color',
          events: {
            click: () => {
              console.log('event Выйти');
            },
          },
        }),
      },
    ];

    const userInfoProps = [
      {
        label: 'Изменить данные',
        text: 'pochta@yandex.ru',
      },
      {
        label: 'Логин',
        text: 'ivanivanov',
      },
      {
        label: 'Имя',
        text: 'John',
      },
      {
        label: 'Фамилия',
        text: 'Doe',
      },
      {
        label: 'Имя в чате',
        text: 'John',
      },

      {
        label: 'Телефон',
        text: '+7 (909) 967 30 30',
      },
    ];

    const links = linksProps.map((link) => {
      return new Component.LinkBorderBottom(link);
    });

    const userInfo = userInfoProps.map((user) => {
      return new Component.TextProfile(user);
    });

    let avatar = new Component.Avatar({});
    let title = new Component.Title({ title: 'John' });
    const backButton = new Component.Button({
      className: 'arrowLeft',
      events: {
        click: () => {
          console.log('back event');
        },
      },
    });

    super({
      ...props,
      topContainer: [avatar, title],
      middleContainer: userInfo,
      bottomContainer: links,
      leftSideBar: backButton,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
