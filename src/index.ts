import './styles/style.pcss';
import * as Page from './pages';
import { connect, router, routes } from './services';

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(routes.auth, connect(Page.Authorization))
    .use(routes.signUp, connect(Page.Registration))
    .use(routes.settings, connect(Page.ProfileInfo))
    .use(routes.settingsEdit, connect(Page.ProfileEdit))
    .use(routes.settingsEditPassword, connect(Page.ProfileEditPassword))
    .use(routes.chat, connect(Page.ChatPreview))
    .use(routes.notFoundPage, Page.ErrorClient);

  let isAuth = true;

  switch (window.location.pathname) {
    case routes.auth:
    case routes.signUp:
      isAuth = false;
      break;
    default:
      if (!Object.values(routes).includes(window.location.pathname)) {
        router.go(routes.notFoundPage);
      }
  }

  router.start();
});
