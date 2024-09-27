import { TProps } from '../../types';
import Block from '../../utils/block';
import * as Component from '..';
import template from './template.hbs?raw';
import { validate } from '../../utils/validate';

export default class ChatForm extends Block {
  constructor(props: TProps) {
    const buttonSubmit = new Component.Button({
      className: 'arrowRight',
      type: 'submit',
    });

    const textarea = new Component.Textarea({
      className: 'input-grey',
      name: 'message',
      placeholderText: 'Сообщение',
      attr: {
        'data-required': true,
      },
      events: {
        blur: (event: FocusEvent) => {
          validate(event.target as HTMLInputElement);
        },
      },
    });

    super({
      ...props,
      sentButton: buttonSubmit,
      textarea: textarea,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
