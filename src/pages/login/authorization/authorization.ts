import * as Component from '../../../components';
import { TProps } from '../../../types';
import Block from '../../../utils/block';
import template from '../template.hbs?raw';

export default class Authorization extends Block {
  constructor(props: TProps) {
    const fieldsProps = [
      {
        label: 'Логин',
        input: new Component.Input({
          type: 'text',
          name: 'login',
          id: 'login',
        }),
      },
      {
        label: 'Пароль',
        input: new Component.Input({
          type: 'password',
          name: 'password',
          id: 'login',
        }),
      },
    ];
    const fields = fieldsProps.map((field) => {
      return new Component.InputBlock(field);
    });

    const button = new Component.Button({
      text: 'Авторизация',
      withInternalId: true,
      attr: {},
      events: {
        click: () => {
          console.log('button event');
        },
      },
    });

    const link = new Component.Link({
      text: 'Нет аккаунта?',
      href: '/',
      events: {
        click: () => {
          console.log('link event');
        },
      },
    });

    super({
      ...props,
      title: 'Авторизация',
      button: button,
      inputBlocks: fields,
      link: link,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
