import * as Component from '../../../components';
import Block from '../../../utils/block';
import template from '../template.hbs?raw';

export default class Authorization extends Block {
  constructor(props) {
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
      attr: { withInternalID: true },
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
      blockLinks: new Component.BlockLinks(),
    });
  }

  render() {
    console.log(template);
    return this.compile(template, { ...this.props });
  }
}
