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

    const logo = new Component.Logo({});

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
    super({
      ...props,
      topContainer: logo,
      middleContainer: fields,
      bottomCenterContainer: button,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
