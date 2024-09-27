import { TProps } from '../../../types';
import Block from '../../../utils/block';
import * as Component from '../../../components';
import template from '../template.hbs?raw';
import { validate, validateForm } from '../../../utils/validate';

export default class ProfileEditPassword extends Block {
  constructor(props: TProps) {
    const fieldsProps = [
      {
        label: 'Старый пароль',
        input: new Component.Input({
          type: 'password',
          placeholderText: '*****',
          name: 'oldPassword',
          className: 'text-profile-block_input',
          attr: {
            'data-required': true,
            'data-max-length': 40,
            'data-min-length': 8,
            'data-valid-password': true,
          },
          events: {
            blur: (event: FocusEvent) => {
              validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
      {
        label: 'Новый пароль',
        input: new Component.Input({
          type: 'password',
          placeholderText: '*****',
          name: 'newPassword',
          className: 'text-profile-block_input',
          attr: {
            'data-required': true,
            'data-max-length': 40,
            'data-min-length': 8,
            'data-valid-password': true,
          },
          events: {
            blur: (event: FocusEvent) => {
              validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
      {
        label: 'Повторите новый пароль',
        input: new Component.Input({
          type: 'password',
          placeholderText: '*****',
          name: 'newPassword',
          className: 'text-profile-block_input',
          attr: {
            'data-required': true,
            'data-max-length': 40,
            'data-min-length': 8,
            'data-valid-password': true,
          },
          events: {
            blur: (event: FocusEvent) => {
              validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
    ];

    const fields = fieldsProps.map((field) => {
      return new Component.InputTextProfile(field);
    });

    const avatar = new Component.Avatar({});

    const buttonSubmit = new Component.Button({
      text: 'Сохранить',
      withInternalId: true,
      type: 'submit',
    });

    const backButton = new Component.Button({
      className: 'arrowLeft',
      events: {
        click: () => {
          console.log('back event');
        },
      },
    });

    const form = new Component.ProfileForm({
      fields,
      buttonSubmit,
      events: {
        submit: (event: Event) => {
          validateForm(event);
        },
      },
    });

    super({
      ...props,
      topContainer: avatar,
      form,
      leftSideBar: backButton,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
