import './styles/style.pcss';
import App from './App';
import { render } from './utils/renderDOM';
import Button from './components/Button';

document.addEventListener('DOMContentLoaded', () => {
  // const app = new App();
  // app.render();

  //Я пока убрала все страницы, и хочу просто выводить кнопку (.hbs шаблон) в класс app

  let button = new Button({
    text: 'button text',
  });

  render('.app', button);

  setTimeout(() => {
    button.setProps({
      text: 'button text update',
    });
  }, 2000);
});
