import { UserType } from '../types';
import { authAPI } from '../api';
import { router } from '../services';
import { store } from '../store';

export class AuthController {
  public getUser() {
    return authAPI
      .getUserAPI()
      .then((data) => {
        store.setState('user', JSON.parse(data));
        console.log('data', data);
        router.go('/messenger');
      })
      .catch((error) => {
        router.go('/');
        // if (error.status === 401) {
        //   store.set('errorMessage', 'Вы не зарегистрированный пользователь');
        // } else {
        //   store.set('errorMessage', 'Неизвестная ошибка');
        // }
      });
  }

  login(dataForm: UserType) {
    return authAPI
      .loginAPI(dataForm)
      .then(() =>
        authAPI.getUserAPI().then((data) => {
          console.log('goood', error);
          store.setState('user', JSON.parse(data));
          router.go('/settings/edit');
          // router.go('/messenger');
        }),
      )
      .catch((error) => {
        if (error.status === 401) {
          store.setState('user.errorMessage', 'Вы не зарегистрированный пользователь');
        } else {
          store.setState('user.errorMessage', 'Неизвестная ошибка');
        }
      });
  }

  signUp(dataForm: UserType) {
    return authAPI
      .signUpAPI(dataForm)
      .then(() =>
        authAPI.getUserAPI().then((data) => {
          store.set('user', JSON.parse(data?.response));
          router.go('/profile');
          // router.go('/messenger');
        }),
      )
      .catch((error) => {
        throw new Error(error);
      });
  }

  getStore() {
    //return store.getState();
  }
}

export const authController = new AuthController();
