import Handlebars from "handlebars";
import * as Pages from './pages'
import * as Components from './components'

Handlebars.registerPartial('BlockLinks', Components.BlockLinks);
Handlebars.registerPartial('Button', Components.Button);
Handlebars.registerPartial('Link', Components.Link);
Handlebars.registerPartial('Input', Components.Input);
Handlebars.registerPartial('TextProfile', Components.TextProfile);
Handlebars.registerPartial('InputTextProfile', Components.InputTextProfile);
Handlebars.registerPartial('LinkArrow', Components.LinkArrow);
Handlebars.registerPartial('LeftBar', Components.LeftBar);
Handlebars.registerPartial('ChartBlock', Components.ChartBlock);


export default class App {
  constructor() {
    this.state = {
      currentPage: 'authorization'
    }
    this.appElement = document.getElementById('app');
  };

  render() {
    let template;

    if(this.state.currentPage === 'authorization') {
      template = Handlebars.compile(Pages.Authorization);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage
      })
    }
    if(this.state.currentPage === 'registration') {
      template = Handlebars.compile(Pages.Registration);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage 
      })
    }
    if(this.state.currentPage === 'profile') {
      template = Handlebars.compile(Pages.Profile);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage 
      })
    }
    if(this.state.currentPage === 'profile-edit') {
      template = Handlebars.compile(Pages.ProfileEdit);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage,
      })
    }
    if(this.state.currentPage === 'profile-edit-password') {
      template = Handlebars.compile(Pages.ProfileEditPassword);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage,
      })
    }
    if(this.state.currentPage === 'charts') {
      template = Handlebars.compile(Pages.Chats);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage,
      })
    }
    if(this.state.currentPage === 'chart') {
      template = Handlebars.compile(Pages.Chat);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage,
      })
    }
    if(this.state.currentPage === 'server-error') {
      template = Handlebars.compile(Pages.ServerErrorPage);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage,
      })
    }
    if(this.state.currentPage === 'error') {
      template = Handlebars.compile(Pages.ErrorPage);
      this.appElement.innerHTML = template({
        currentPage: this.state.currentPage,
      })
    }
    this.attachEventListeners(); 
  }
 
  attachEventListeners() {
    const linkNavigation = document.querySelectorAll('.block-links_navigation');
    linkNavigation.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      })
    })
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }
} 
