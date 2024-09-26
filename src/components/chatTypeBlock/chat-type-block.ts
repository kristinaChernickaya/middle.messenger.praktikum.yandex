import { TProps } from '../../types';
import Block from '../../utils/block';
import * as Component from '../../components';
import template from './template.hbs?raw';

export default class ChatTypeBlock extends Block {
  constructor(props: TProps) {
    const sentButton = new Component.Button({
      className: 'arrowRight',
      events: {
        click: () => {
          console.log('sent event');
        },
      },
    });

    const textarea = new Component.Textarea({
      className: 'input-grey',
      name: 'message',
      placeholderText: 'Сообщение',
      events: {
        click: () => {
          console.log('sent event');
        },
      },
    });

    super({
      ...props,
      sentButton: sentButton,
      textarea: textarea,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
