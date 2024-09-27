import { TProps } from '../../types';
import Block from '../../utils/block';
import template from './template.hbs?raw';

export default class Form extends Block {
  constructor(props: TProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
