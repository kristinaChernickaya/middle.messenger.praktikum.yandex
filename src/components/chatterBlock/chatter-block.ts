import { Block } from '../../services';
import { TProps } from '../../types';
import template from './template.hbs?raw';

export default class ChatterBlock extends Block {
  constructor(props: TProps) {
    const dateMassage = '14 июня';
    const answerMessage = 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории ';
    const myMessage = 'Круто!';

    super({
      ...props,
      dateMassage,
      answerMessage,
      myMessage,
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
