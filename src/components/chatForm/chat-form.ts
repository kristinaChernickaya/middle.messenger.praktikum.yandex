import * as Service from '../../services';
import { TProps } from '../../types';
import * as Component from '..';
import template from './template.hbs?raw';

export default class ChatForm extends Service.Block {
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
          Service.validate(event.target as HTMLInputElement);
        },
      },
    });

    super({
      ...props,
      sentButton: buttonSubmit,
      textarea: textarea,
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
