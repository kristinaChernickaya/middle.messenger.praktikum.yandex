import { HTTPMethodType, RequestOptionsType } from '../types';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export default class HTTPTransport {
  queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Data must be object');
    }

    let result = '?';

    for (const [key, value] of Object.entries(data)) {
      result += `${key}=${value}&`;
    }

    return result.slice(0, -1);
  }

  get: HTTPMethodType = (url, options) => {
    return this.request(
      options.data ? `${url}${this.queryStringify(options.data)}` : url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post: HTTPMethodType = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put: HTTPMethodType = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete: HTTPMethodType = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: RequestOptionsType, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
