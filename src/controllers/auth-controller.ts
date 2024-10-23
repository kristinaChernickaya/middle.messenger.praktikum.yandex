import { UserType } from '../types';
import { authAPI } from '../api';
import { router } from '../services';
import { store } from '../store';

export class AuthController {
  public getUserAuth() {
    return authAPI
      .getUserAPI()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  public getUserData() {
    return authAPI
      .getUserAPI()
      .then((data) => {
        store.setState('user', JSON.parse(data));
      })
      .catch((error) => {
        // store.setState('errorMessage', JSON.parse(error.response).reason);
      });
  }

  login(dataForm: UserType) {
    return authAPI
      .loginAPI(dataForm)
      .then(() =>
        authAPI.getUserAPI().then((data) => {
          store.setState('user', JSON.parse(data));
          //router.go('/messenger');
        }),
      )
      .catch((error) => {
        // store.setState('errorMessage', JSON.parse(error.response).reason);
        //router.go('/');
      });
  }

  signUp(dataForm: UserType) {
    return authAPI
      .signUpAPI(dataForm)
      .then(() =>
        authAPI.getUserAPI().then((data) => {
          store.setState('user', JSON.parse(data));
          router.go('/messenger');
        }),
      )
      .catch((error) => {
        store.setState('errorMessage', JSON.parse(error.response).reason);
      });
  }

  getStore() {
    //return store.getState();
  }
}

export const authController = new AuthController();
