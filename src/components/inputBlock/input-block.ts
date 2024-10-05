import { Block } from '../../services';
import { InputBlockType } from '../../types';
import template from './template.hbs?raw';
export default class InputBlock extends Block {
  constructor(props: InputBlockType) {
    super(props);
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
