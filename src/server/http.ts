import axios, { AxiosInstance } from 'axios';

export interface IHttpData {
  code: number;
  msg: string;
  [key: string]: any;
}

export interface IHttpFactoryConfig {
  baseURL?: string;
  timeout?: number;
  httpErrorCallback?: (err: any) => any;
  businessErrorHandler?: (data: IHttpData) => any;
}

// http错误处理
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

// 业务错误处理
const defaultBusinessErrorHandler = (data: IHttpData) => {
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

export const httpFactory = ({
  baseURL,
  timeout,
  httpErrorCallback = defaultHttpErrorCallback,
  businessErrorHandler = defaultBusinessErrorHandler,
}: IHttpFactoryConfig = {}): AxiosInstance => {
  const http = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  // 请求拦截
  http.interceptors.request.use((config) => config, httpErrorCallback);

  // 响应拦截
  http.interceptors.response.use(
    (response) => (businessErrorHandler ? businessErrorHandler(response.data) : response.data),
    httpErrorCallback,
  );

  return http;
};
