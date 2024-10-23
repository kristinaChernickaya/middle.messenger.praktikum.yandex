import './styles/style.pcss';
import * as Page from './pages';
import { connect, router, routes } from './services';
import { authController } from './controllers';

window.addEventListener('DOMContentLoaded', async () => {
  let isAuth = await authController.getUserAuth().then((isResponse) => isResponse);
  await authController.getUserData();

  function mapUserToProps(state) {
    return {
      user: state.user,
    };
  }

  router
    .use(routes.login, connect(Page.Login, mapUserToProps))
    .use(routes.signUp, connect(Page.Signup, mapUserToProps))
    .use(routes.settings, connect(Page.ProfileInfo, mapUserToProps))
    .use(routes.settingsEdit, connect(Page.ProfileEdit, mapUserToProps))
    .use(routes.settingsEditPassword, connect(Page.ProfileEditPassword, mapUserToProps))
    .use(routes.chat, connect(Page.ChatPreview, mapUserToProps))
    .use(routes.notFoundPage, connect(Page.ChatPreview, mapUserToProps));

  let pathWindow = window.location.pathname;

  if (isAuth) {
    if (pathWindow === '/' || pathWindow === '/sign-up') {
      router.go(routes.settings);
    }
  }
  if (!isAuth) {
    if (
      pathWindow === '/messenger' ||
      pathWindow === '/settings' ||
      pathWindow === '/settings/edit' ||
      pathWindow === '/settings/edit-password'
    ) {
      router.go(routes.login);
    }
  }

  if (!Object.values(routes).includes(pathWindow)) {
    router.go(routes.notFoundPage);
  }

  router.start();
});
