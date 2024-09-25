import { TProps } from '../../../types';
import Block from '../../../utils/block';
import * as Component from '../../../components';
import template from '../template.hbs?raw';

export default class ProfileEdit extends Block {
  constructor(props: TProps) {
    const fieldsProps = [
      {
        label: 'Почта',
        input: new Component.Input({
          type: 'text',
          placeholderText: 'pochta@yandex.ru',
          name: 'email',
          id: 'email',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Логин',
        input: new Component.Input({
          type: 'text',
          placeholderText: 'JohnJonson',
          name: 'login',
          id: 'login',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Имя',
        input: new Component.Input({
          type: 'text',
          placeholderText: 'John',
          name: 'first_name',
          id: 'first_name',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Фамилия',
        input: new Component.Input({
          type: 'text',
          placeholderText: 'Doe',
          name: 'second_name',
          id: 'second_name',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Имя в чате',
        input: new Component.Input({
          type: 'text',
          placeholderText: 'John',
          name: 'display_name',
          id: 'display_name',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Телефон',
        input: new Component.Input({
          type: 'text',
          placeholderText: '+7 (909) 967 30 30',
          name: 'phone',
          id: 'phone',
          className: 'text-profile-block_input',
        }),
      },
    ];

    const fields = fieldsProps.map((field) => {
      return new Component.InputTextProfile(field);
    });

    const avatar = new Component.Avatar({});

    const button = new Component.Button({
      text: 'Сохранить',
      withInternalId: true,
      attr: {},
      events: {
        click: () => {
          console.log('Сохранить event');
        },
      },
    });
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
      topContainer: avatar,
      middleContainer: fields,
      bottomCenterContainer: button,
      leftSideBar: backButton,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
