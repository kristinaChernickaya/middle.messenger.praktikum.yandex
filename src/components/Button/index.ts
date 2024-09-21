import { TButtonProps } from '../../types';
import Block from '../../utils/block';
import template from './template.hbs?raw';
export default class Button extends Block {
  constructor(props: TButtonProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
