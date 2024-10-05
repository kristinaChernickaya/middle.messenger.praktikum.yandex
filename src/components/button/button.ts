import { Block } from '../../services';
import { TButton } from '../../types';
import template from './template.hbs?raw';

export default class Button extends Block<TButton> {
  constructor(props: TButton) {
    super(props);
  }

  override render() {
    return this.compile(template, this.props);
  }
}
