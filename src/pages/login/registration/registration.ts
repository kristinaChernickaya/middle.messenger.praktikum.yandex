import * as Component from '../../../components';
import { TProps } from '../../../types';
import Block from '../../../utils/block';
import template from '../template.hbs?raw';

export default class Registration extends Block {
  constructor(props: TProps) {
    const fieldsProps = [
      {
        label: 'Почта',
        input: new Component.Input({
          type: 'text',
          name: 'email',
          id: 'email',
        }),
      },
      {
        label: 'Логин',
        input: new Component.Input({
          type: 'text',
          name: 'login',
          id: 'login',
        }),
      },
      {
        label: 'Имя',
        input: new Component.Input({
          type: 'text',
          name: 'first_name',
          id: 'first_name',
        }),
      },
      {
        label: 'Фамилия',
        input: new Component.Input({
          type: 'text',
          name: 'second_name',
          id: 'second_name',
        }),
      },
      {
        label: 'Телефон',
        input: new Component.Input({
          type: 'text',
          name: 'phone',
          id: 'phone',
        }),
      },
      {
        label: 'Пароль',
        input: new Component.Input({
          type: 'text',
          name: 'password',
          id: 'password',
        }),
      },
      {
        label: 'Пароль (ещё раз)',
        input: new Component.Input({
          type: 'password',
          name: 'password',
        }),
      },
    ];
    const fields = fieldsProps.map((field) => {
      return new Component.InputBlock(field);
    });

    const button = new Component.Button({
      text: 'Зарегистрироваться',
      attr: { withInternalID: true },
      events: {
        click: () => {
          console.log('button event Зарегистрироваться');
        },
      },
    });

    const link = new Component.Link({
      text: 'Войти',
      href: '/',
      events: {
        click: () => {
          console.log('link event Войти');
        },
      },
    });

    super({
      ...props,
      title: 'Регистрация',
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
