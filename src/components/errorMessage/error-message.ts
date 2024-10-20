import { Block } from '../../services';
import { ButtonType } from '../../types';
import template from './template.hbs?raw';

export default class Error extends Block {
  constructor(props?: ButtonType) {
    super(props);
  }

  override render() {
    return this.compile(template, this.props);
  }
}
