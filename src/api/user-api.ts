import { UserType } from '../types';
import * as Service from '../services';

const chatAPIInstance = new Service.HttpClient('https://ya-praktikum.tech/api/v2/user');

export class UserAPI extends Service.BaseAPI {
  updateUserAPI(data: UserType) {
    return chatAPIInstance
      .put('/profile', {
        data: JSON.stringify(data),
        isCredentials: true,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((data) => {
        return data;
      });
  }
}

export const userAPI = new UserAPI();
