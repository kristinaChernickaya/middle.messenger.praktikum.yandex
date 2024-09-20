import './styles/style.pcss';
import App from './App';
import { render } from './utils/renderDOM';
import Button from './components/Button';

document.addEventListener('DOMContentLoaded', () => {
  // const app = new App();
  // app.render();

  let button = new Button({
    text: 'button text',
    settings: { withInternalID: true },
    events: {
      click: (event) => {
        console.log(event);
      },
    },
  });

  render('.app', button);

  setTimeout(() => {
    button.setProps({
      text: 'button text update',
    });
  }, 2000);
});
