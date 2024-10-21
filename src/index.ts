import './styles/style.pcss';
import * as Page from './pages';
import { connect, router, routes } from './services';
import { authController } from './controllers';

window.addEventListener('DOMContentLoaded', async () => {
  let isAuth = await authController.getUserAuth().then((isResponse) => isResponse);
  router
    .use(routes.login, connect(Page.Login))
    .use(routes.signUp, connect(Page.Signup))
    .use(routes.settings, connect(Page.ProfileInfo))
    .use(routes.settingsEdit, connect(Page.ProfileEdit))
    .use(routes.settingsEditPassword, connect(Page.ProfileEditPassword))
    .use(routes.chat, connect(Page.ChatPreview))
    .use(routes.notFoundPage, Page.ErrorClient);

  let pathWindow = window.location.pathname;
  console.log(isAuth);
  if (isAuth) {
    if (pathWindow === '/' || pathWindow === '/sign-up') {
      router.go(routes.chat);
    }
  }
  if (!isAuth) {
    if (
      pathWindow === '/settings' ||
      pathWindow === '/settings/edit' ||
      pathWindow === '/settings/edit-password' ||
      pathWindow === '/messenger'
    ) {
      router.go(routes.login);
    }
  }

  if (!Object.values(routes).includes(pathWindow)) {
    router.go(routes.notFoundPage);
  }

  router.start();
});
