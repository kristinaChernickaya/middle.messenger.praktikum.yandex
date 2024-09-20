import Block from '../../utils/block';
import template from './template.hbs?raw';

export default class Button extends Block {
  constructor(props: { text: string; className?: string }) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
