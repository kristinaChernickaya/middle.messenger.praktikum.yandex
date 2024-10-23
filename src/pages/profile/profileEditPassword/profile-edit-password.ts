import * as Component from '../../../components';
import * as Service from '../../../services';
import { TProps } from '../../../types';
import template from '../template.hbs?raw';
import { getDataForm } from '../../../utils';

export default class ProfileEditPassword extends Service.Block {
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
            blur: (event) => {
              Service.validate(event.target as HTMLInputElement);
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
            blur: (event) => {
              Service.validate(event.target as HTMLInputElement);
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
            blur: (event) => {
              Service.validate(event.target as HTMLInputElement);
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
          Service.router.go('/settings');
        },
      },
    });

    const form = new Component.ProfileForm({
      fields,
      buttonSubmit,
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
      topContainer: avatar,
      form,
      leftSideBar: backButton,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
