import { Block } from '../../services';
import { TProps } from '../../types';
import template from './template.hbs?raw';
export default class InputBlock extends Block {
  constructor(props: TProps) {
    super(props);
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
