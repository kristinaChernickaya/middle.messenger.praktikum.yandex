import { isEqual } from '../../../utils';
import * as Component from '../../../components';
import * as Service from '../../../services';
import { TProps } from '../../../types';
import template from '../template.hbs?raw';
import { store } from '../../../store';
import { UserController } from '../../../controllers';

export default class ProfileInfo extends Service.Block {
  constructor(props?: TProps) {
    const linksProps = [
      {
        link: new Component.Link({
          text: 'Изменить данные',
          events: {
            click: () => {
              Service.router.go('/settings/edit');
            },
          },
        }),
      },
      {
        link: new Component.Link({
          text: 'Изменить пароль',
          events: {
            click: () => {
              Service.router.go('/settings/edit-password');
            },
          },
        }),
      },
      {
        link: new Component.Link({
          text: 'Выйти',
          className: 'text-red-color',
          events: {
            click: () => {
              Service.router.go('/settings/edit');
            },
          },
        }),
      },
    ];

    const userData = [
      { label: 'Почта', text: 'email' },
      { label: 'Логин', text: 'login' },
      { label: 'Имя', text: 'first_name' },
      { label: 'Фамилия', text: 'second_name' },
      { label: 'Имя в чате', text: 'display_name' },
      { label: 'Телефон', text: 'phone' },
    ];

    const userInfo = userData.map((field) => {
      return new Component.TextProfile({
        label: field.label,
        text: props?.user[field.text],
      });
    });

    const links = linksProps.map((link) => {
      return new Component.LinkBorderBottom(link);
    });

    let avatar = new Component.Avatar({});
    let title = new Component.Title({ title: props.user.first_name });
    const backButton = new Component.Button({
      className: 'arrowLeft',
      events: {
        click: () => {
          Service.router.go('/messenger');
        },
      },
    });

    super({
      topContainer: [avatar, title],
      middleContainer: userInfo,
      bottomContainer: links,
      leftSideBar: backButton,
      blockLinks: new Component.BlockLinks({}),
      ...props,
    });
  }

  // componentDidUpdate(newProps, oldProps) {
  //   console.log('componentDidUpdate');
  // if (!isEqual(newProps.user, oldProps.user)) {
  //   console.log('n', newProps, 'o', oldProps);
  //   this.setProps({ user: 'sdfsdf' });
  // }
  // }

  override render() {
    return this.compile(template, {});
  }
}
