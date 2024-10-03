import { Block } from '../../services';
import { TProps } from '../../types';
import template from './template.hbs?raw';

export default class BlockLink extends Block {
  constructor(props: TProps) {
    super(props);
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
