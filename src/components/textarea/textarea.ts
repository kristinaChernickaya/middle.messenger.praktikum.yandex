import { Block } from '../../services';
import { TextareaType } from '../../types';
import template from './template.hbs?raw';

export default class Textarea extends Block {
  constructor(props: TextareaType) {
    super(props);
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
