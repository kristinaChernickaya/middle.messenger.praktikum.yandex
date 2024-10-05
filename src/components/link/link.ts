import { Block } from '../../services';
import { LinkType } from '../../types';
import template from './template.hbs?raw';

export default class Input extends Block {
  constructor(props: LinkType) {
    super(props);
  }

  override render() {
    return this.compile(template, { ...this.props });
  }
}
