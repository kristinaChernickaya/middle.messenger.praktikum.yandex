import { TProps } from '../../../types';
import Block from '../../../utils/block';
import * as Component from '../../../components';
import template from '../template.hbs?raw';

export default class ProfileEditPassword extends Block {
  constructor(props: TProps) {
    const fieldsProps = [
      {
        label: 'Старый пароль',
        input: new Component.Input({
          type: 'password',
          placeholderText: '*****',
          name: 'oldPassword',
          id: 'oldPassword',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Новый пароль',
        input: new Component.Input({
          type: 'password',
          placeholderText: '*****',
          name: 'newPassword',
          id: 'newPassword',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Повторите новый пароль',
        input: new Component.Input({
          type: 'password',
          placeholderText: '*****',
          name: 'newPassword',
          id: 'newPassword',
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
