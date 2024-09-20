import Block from '../../utils/block';
import template from './template.hbs?raw';

export default class Button extends Block {
  constructor(props: { text: string; className?: string }) {
    super('div', props);
  }

  render() {
    // return compile(template, this.props);
    //return template;
    return `<button>${this.props.text}</button>`;
  }
}
