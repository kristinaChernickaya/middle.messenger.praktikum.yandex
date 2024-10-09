import { getDataForm } from '../../../utils';
import * as Component from '../../../components';
import * as Service from '../../../services';
import { TProps } from '../../../types';
import template from '../template.hbs?raw';

export default class Authorization extends Service.Block {
  constructor(props?: TProps) {
    const fieldsProps = [
      {
        label: 'Логин',
        input: new Component.Input({
          type: 'text',
          name: 'login',
          attr: {
            'data-required': true,
            'data-max-length': 20,
            'data-min-length': 3,
            'data-valid-login': true,
          },
          events: {
            blur: (event: Event) => {
              Service.validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
      {
        label: 'Пароль',
        input: new Component.Input({
          type: 'password',
          name: 'password',
          attr: {
            'data-required': true,
            'data-max-length': 40,
            'data-min-length': 8,
            'data-valid-password': true,
          },
          events: {
            blur: (event) => {
              Service.validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
    ];
    const inputBlocks = fieldsProps.map((field) => {
      return new Component.InputBlock(field);
    });

    const button = new Component.Button({
      text: 'Авторизация',
      type: 'submit',
      withInternalId: true,
      events: {
        click: () => {
          console.log('sss');
          history.back();
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

    const form = new Component.Form({
      button,
      inputBlocks,
      link,
      events: {
        submit: (event: Event) => {
          Service.validateForm(event);
          if (Service.validateForm(event)) {
            getDataForm(event);
          }
        },
      },
    });

    super({
      ...props,
      title: 'Авторизация',
      form,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
