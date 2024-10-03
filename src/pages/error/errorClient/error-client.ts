import * as Component from '../../../components';
import * as Service from '../../../services';
import { TProps } from '../../../types';
import template from '../template.hbs?raw';

export default class ErrorClient extends Service.Block {
  constructor(props: TProps) {
    const link = new Component.Link({
      text: 'Назад к чатам',
      href: '/',
      events: {
        click: () => {
          console.log('event Назад к чатам');
        },
      },
    });

    super({
      ...props,
      title: '404',
      info: 'Не туда попали',
      link: link,
      blockLinks: new Component.BlockLinks({}),
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
