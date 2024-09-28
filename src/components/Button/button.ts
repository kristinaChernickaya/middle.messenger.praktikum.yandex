import { Block } from '../../services';
import { TButtonProps } from '../../types';
import template from './template.hbs?raw';

export default class Button extends Block {
  constructor(props: TButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
