import axios, { AxiosInstance } from 'axios';

export interface IHttpData {
  code: number;
  msg: string;
  [key: string]: any;
}

export interface IHttpFactoryOptions {
  baseURL?: string;
  timeout?: number;
  httpErrorCallback?: (err: any) => any;
  businessErrorHandler?: (data: IHttpData) => any;
}

const defaultHttpErrorCallback = (err: any) => {
  const { message, response } = err;
  if (response) {
    switch (response.status) {
      case 400:
      default: {
        return Promise.reject(message);
      }
    }
  } else {
    return Promise.reject(message);
  }
};

const defaultbusinessErrorHandler = (data: IHttpData) => {
  const { code, msg } = data;
  switch (code) {
    case 40000: {
      return Promise.reject(msg);
    }
    default: {
      return Promise.resolve(data);
    }
  }
};

export const httpFactory = (options: IHttpFactoryOptions | undefined = {}): AxiosInstance => {
  const {
    baseURL,
    timeout,
    httpErrorCallback = defaultHttpErrorCallback,
    businessErrorHandler = defaultbusinessErrorHandler,
  } = options;

  const http = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  http.interceptors.request.use((config) => config, httpErrorCallback);
  http.interceptors.response.use((response) => businessErrorHandler(response.data), httpErrorCallback);

  return http;
};
