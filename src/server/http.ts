import axios, { AxiosInstance } from 'axios';

export interface IHttpOptions {
  baseURL?: string;
  timeout?: number;
}

export const httpFactory = (options: IHttpOptions | undefined = {}): AxiosInstance => {
  const { baseURL, timeout } = options;

  const http = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  http.interceptors.request.use(
    (config) => config,
    (err) => {
      return Promise.reject(err);
    },
  );

  http.interceptors.response.use(
    (response) => response,
    (err) => {
      return Promise.reject(err);
    },
  );

  return http;
};
