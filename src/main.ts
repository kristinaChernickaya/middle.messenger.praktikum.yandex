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
   <h2>{{title}}</h2>
    {{{button}}}
  </div>
`;

  const button = new Button({
    text: 'button text',
    attr: { withInternalID: true },
    events: {
      click: (event) => {
        console.log('button event !!!!!!!!');
      },
    },
  });
  class UserProfile extends Block {
    constructor(props) {
      super(props);
    }

    render() {
      return this.compile(profileTemplate, {
        title: this.props.title,
        button,
      });
    }
  }

  const profile = new UserProfile({
    title: 'Авторизация',
    button,
  });

  renderDOM('.app', profile);
  setTimeout(() => {
    button.setProps({ text: 'Updated text on button' });
  }, 2000);
});
