import './styles/style.pcss';
import App from './App';
import { renderDOM } from './utils/renderDOM';
import Button from './components/Button';
import Block from './utils/block';

document.addEventListener('DOMContentLoaded', () => {
  // const app = new App();
  // app.render();

  const profileTemplate = `
  <div>
    {{title}}
    {{{button}}}
  </div>
`;
  class UserProfile extends Block {
    constructor(props) {
      super('div', props);
    }

    render() {
      return this.compile(profileTemplate, {
        title: this.props.title,
        button,
      });
    }
  }
  const button = new Button({
    text: 'button text',
    attr: { withInternalID: false },
    events: {
      click: (event) => {
        console.log('button event !!!!!!!!');
      },
    },
  });
  const profile = new UserProfile({
    title: 'Авторизация',
    button,
    // events: {
    //   click: (event) => {
    //     console.log('UserProfile event !!!!!!!!');
    //   },
    // },
  });

  renderDOM('.app', profile);
  //console.log(profile);

  // setTimeout(() => {
  //   button.setProps({ text: 'Updated text on button' });
  // }, 2000);
});
