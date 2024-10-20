import * as Service from '../services';

const chatAPIInstance = new Service.HttpClient('https://ya-praktikum.tech/api/v2/auth');

export class AuthAPI extends Service.BaseAPI {
  getUserAPI() {
    return chatAPIInstance.get('/user', {
      isCredentials: true,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  loginAPI(data) {
    return chatAPIInstance.post('/signin', {
      isCredentials: true,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  signUpAPI(data) {
    return chatAPIInstance.post('/signup', {
      isCredentials: true,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }
}
const authAPI = new AuthAPI();
export default authAPI;
