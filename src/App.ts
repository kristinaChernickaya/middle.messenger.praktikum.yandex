import * as Page from './pages';
import { renderDOM } from './services';

interface AppState {
  currentPage: string;
}

export default class App {
  state: AppState;
  appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPage: 'authorization',
    };
    this.appElement = document.getElementById('app') as HTMLElement;
  }

  render(): void {
    let template:
      | Page.Authorization
      | Page.Registration
      | Page.ProfileInfo
      | Page.ProfileEdit
      | Page.ProfileEditPassword
      | Page.ChatPreview
      | Page.ChatCurrent
      | Page.ErrorClient
      | Page.ErrorServer
      | undefined;
    this.appElement.innerHTML = '';

    switch (this.state.currentPage) {
      case 'authorization':
        template = new Page.Authorization({ currentPage: this.state.currentPage });
        break;
      case 'registration':
        template = new Page.Registration({ currentPage: this.state.currentPage });
        break;
      case 'profile':
        template = new Page.ProfileInfo({ currentPage: this.state.currentPage });
        break;
      case 'profile-edit':
        template = new Page.ProfileEdit({ currentPage: this.state.currentPage });
        break;
      case 'profile-edit-password':
        template = new Page.ProfileEditPassword({ currentPage: this.state.currentPage });
        break;
      case 'chats':
        template = new Page.ChatPreview({ currentPage: this.state.currentPage });
        break;
      case 'chat':
        template = new Page.ChatCurrent({ currentPage: this.state.currentPage });
        break;
      case 'error-client':
        template = new Page.ErrorClient({ currentPage: this.state.currentPage });
        break;
      case 'error-server':
        template = new Page.ErrorServer({ currentPage: this.state.currentPage });
        break;
      default:
        template = undefined;
    }

    if (template) {
      renderDOM('.app', template);
    }
    this.attachEventListeners();
  }

  attachEventListeners(): void {
    const linkNavigation = document.querySelectorAll('.block-links_navigation')!;
    linkNavigation.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage((e.target as HTMLLinkElement).dataset.page!);
      });
    });
  }

  changePage(page: string): void {
    this.state.currentPage = page;
    this.render();
  }
}
