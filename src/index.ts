import './styles/style.pcss';
import * as Page from './pages';
import { Router, routes } from './router';

window.addEventListener('DOMContentLoaded', async () => {
  const router = new Router('#app');

  router
    .use(routes.auth, Page.Authorization)
    .use(routes.signUp, Page.Registration)
    .use(routes.settings, Page.ProfileInfo)
    .use(routes.chat, Page.ChatPreview)
    .use(routes.notFoundPage, Page.ErrorClient);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case routes.auth:
    case routes.signUp:
      isProtectedRoute = false;
      break;
    default:
      if (!Object.values(routes).includes(window.location.pathname)) {
        router.go(routes.notFoundPage);
      }
  }

  router.start();
});
