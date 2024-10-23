import { authController } from '../../../controllers';
import * as Component from '../../../components';
import * as Service from '../../../services';
import { TProps } from '../../../types';
import template from '../template.hbs?raw';
import { isEqual } from '../../../utils';

export default class ProfileInfo extends Service.Block {
  constructor(props?: TProps) {
    // authController.getUserData();
    const linksProps = [
      {
        link: new Component.Link({
          text: 'Изменить данные',
          href: '/',
          events: {
            click: () => {},
          },
        }),
      },
      {
        link: new Component.Link({
          text: 'Изменить пароль',
          href: '/',
          events: {
            click: () => {},
          },
        }),
      },
      {
        link: new Component.Link({
          text: 'Выйти',
          href: '/',
          className: 'text-red-color',
          events: {
            click: () => {},
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
        click: () => {},
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

  // componentDidUpdate(oldProps, newProps) {
  //   console.log(this.props);
  //   if (!isEqual(oldProps.user, newProps.user)) {
  //     this.setProps({
  //       userName: 'Alex',
  //       user: {
  //         first_name: 'John',
  //         second_name: 'Doe',
  //         display_name: 'My display name',
  //       },
  //     });
  //   }
  // }

  override render() {
    // console.log(this.props);
    return this.compile(template, { ...this.props });
  }
}
