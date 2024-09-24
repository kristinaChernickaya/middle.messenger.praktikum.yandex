import Block from '../../utils/block';
import template from './template.hbs?raw';

export default class Input extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
