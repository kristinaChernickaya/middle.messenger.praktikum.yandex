import Handlebars from 'handlebars';
import * as Page from './pages';
import * as Component from './components';

import { renderDOM } from './utils/renderDOM';

Handlebars.registerPartial('BlockLinks', Component.BlockLinks);
//Handlebars.registerPartial('Button', Components.Button);
Handlebars.registerPartial('Link', Component.Link);
// Handlebars.registerPartial('Input', Components.Input);
Handlebars.registerPartial('TextProfile', Component.TextProfile);
Handlebars.registerPartial('InputTextProfile', Component.InputTextProfile);
Handlebars.registerPartial('LinkArrow', Component.LinkArrow);
Handlebars.registerPartial('LeftBar', Component.LeftBar);
Handlebars.registerPartial('ChartBlock', Component.ChartBlock);

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
    renderDOM('.app', template);
    //    let template;
    // if (this.state.currentPage === 'profile') {
    //   template = Handlebars.compile(Page.Profile);
    //   this.appElement.innerHTML = template({
    //     currentPage: this.state.currentPage,
    //   });
    // }
    // if (this.state.currentPage === 'profile-edit') {
    //   template = Handlebars.compile(Page.ProfileEdit);
    //   this.appElement.innerHTML = template({
    //     currentPage: this.state.currentPage,
    //   });
    // }
    // if (this.state.currentPage === 'profile-edit-password') {
    //   template = Handlebars.compile(Page.ProfileEditPassword);
    //   this.appElement.innerHTML = template({
    //     currentPage: this.state.currentPage,
    //   });
    // }
    // if (this.state.currentPage === 'charts') {
    //   template = Handlebars.compile(Page.Chats);
    //   this.appElement.innerHTML = template({
    //     currentPage: this.state.currentPage,
    //   });
    // }
    // if (this.state.currentPage === 'chart') {
    //   template = Handlebars.compile(Page.Chat);
    //   this.appElement.innerHTML = template({
    //     currentPage: this.state.currentPage,
    //   });
    // }
    // if (this.state.currentPage === 'server-error') {
    //   template = Handlebars.compile(Page.ServerErrorPage);
    //   this.appElement.innerHTML = template({
    //     currentPage: this.state.currentPage,
    //   });
    // }
    // if (this.state.currentPage === 'error') {
    //   template = Handlebars.compile(Page.ErrorPage);
    //   this.appElement.innerHTML = template({
    //     currentPage: this.state.currentPage,
    //   });
    // }
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
