import { UserType } from '../types';
import { userAPI } from '../api';
import { router } from '../services';
import { store } from '../store';

export class UserController {
  updateUserProfile(dataForm: UserType) {
    return userAPI
      .updateUserAPI(dataForm)
      .then((data) => {
        store.setState('user', JSON.parse(data));
        console.log('controller', data);
        // router.go('/settings');
      })
      .catch((error) => {
        console.log('controller bad', error);
        // store.setState('errorMessage', JSON.parse(error.response).reason);
        //router.go('/');
      });
  }
}

export const userController = new UserController();
