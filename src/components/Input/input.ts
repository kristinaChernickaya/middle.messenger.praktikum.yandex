import { Block } from '../../services';
import { TInputProps } from '../../types';
import template from './template.hbs?raw';

export default class Input extends Block {
  constructor(props: TInputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
