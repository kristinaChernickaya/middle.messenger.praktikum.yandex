import { Block } from '../../services';
import { InputType } from '../../types';
import template from './template.hbs?raw';

export default class Input extends Block {
  constructor(props: InputType) {
    super(props);
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
