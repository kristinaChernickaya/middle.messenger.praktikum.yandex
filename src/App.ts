import * as Page from './pages';
import { renderDOM } from './utils/renderDOM';

export default class App {
  state: { currentPage: string };
  appElement: HTMLElement = document.getElementById('app')!;

  constructor() {
    this.state = {
      currentPage: 'authorization',
    };
    this.appElement = document.getElementById('app') as HTMLElement;
  }

  render() {
    let template;
    this.appElement.innerHTML = '';

    if (this.state.currentPage === 'authorization') {
      template = new Page.Authorization({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'registration') {
      template = new Page.Registration({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'profile') {
      template = new Page.ProfileInfo({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'profile-edit') {
      template = new Page.ProfileEdit({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'profile-edit-password') {
      template = new Page.ProfileEditPassword({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'chats') {
      template = new Page.ChatPreview({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'chat') {
      template = new Page.ChatCurrent({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'error-client') {
      template = new Page.ErrorClient({
        currentPage: this.state.currentPage,
      });
    }
    if (this.state.currentPage === 'error-server') {
      template = new Page.ErrorServer({
        currentPage: this.state.currentPage,
      });
    }
    renderDOM('.app', template);
    this.attachEventListeners();
  }

  attachEventListeners() {
    const linkNavigation = document.querySelectorAll('.block-links_navigation')!;
    linkNavigation.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage((e.target as HTMLLinkElement).dataset.page!);
      });
    });
  }

  changePage(page: string) {
    this.state.currentPage = page;
    this.render();
  }
}
