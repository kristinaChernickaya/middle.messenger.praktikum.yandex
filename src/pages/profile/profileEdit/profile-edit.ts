import * as Component from '../../../components';
import * as Service from '../../../services';
import { TProps, UserType } from '../../../types';
import template from '../template.hbs?raw';
import { getDataForm } from '../../../utils';
import { userController } from '../../../controllers';
import { store } from '../../../store';

export default class ProfileEdit extends Service.Block {
  constructor(props?: TProps) {
    const fieldsProps = [
      {
        label: 'Почта',
        input: new Component.Input({
          type: 'text',
          value: props.user.email,
          name: 'email',
          className: 'text-profile-block_input',
          attr: {
            'data-required': true,
            'data-valid-email': true,
          },
          events: {
            blur: (event) => {
              Service.validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
      {
        label: 'Логин',
        input: new Component.Input({
          type: 'text',
          value: props.user.login,
          name: 'login',
          className: 'text-profile-block_input',
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
        label: 'Имя',
        input: new Component.Input({
          type: 'text',
          //placeholderText: props.user.first_name,
          value: props.user.first_name,
          name: 'first_name',
          className: 'text-profile-block_input',
          attr: {
            'data-required': true,
            'data-valid-name': true,
          },
          events: {
            blur: (event: Event) => {
              Service.validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
      {
        label: 'Фамилия',
        input: new Component.Input({
          type: 'text',
          value: props.user.second_name,
          name: 'second_name',
          className: 'text-profile-block_input',
          attr: {
            'data-required': true,
            'data-valid-name': true,
          },
          events: {
            blur: (event: Event) => {
              Service.validate(event.target as HTMLInputElement);
            },
          },
        }),
      },
      {
        label: 'Имя в чате',
        input: new Component.Input({
          type: 'text',
          value: props.user.display_name,
          name: 'display_name',
          className: 'text-profile-block_input',
        }),
      },
      {
        label: 'Телефон',
        input: new Component.Input({
          type: 'text',
          value: props.user.phone,
          name: 'phone',
          className: 'text-profile-block_input',
          attr: {
            'data-required': true,
            'data-max-length': 15,
            'data-min-length': 10,
            'data-valid-phone': true,
          },
          events: {
            blur: (event: Event) => {
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
          this.componentDidUpdate(props, store.getState());
          Service.router.go('/settings');
        },
      },
    });

    const form = new Component.ProfileForm({
      fields,
      buttonSubmit,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          Service.validateForm(event);
          if (Service.validateForm(event)) {
            const data = getDataForm(event);
            userController.updateUserProfile(data as UserType);
            //this.componentDidUpdate(props, store.getState());
          }
        },
      },
    });
    console.log(props);
    super({
      ...props,
      topContainer: avatar,
      form,
      leftSideBar: backButton,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  override render() {
    console.log(this.props);
    return this.compile(template, {});
  }
}
