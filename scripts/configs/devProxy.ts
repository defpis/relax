import { ProxyConfigMap, ProxyConfigArray } from 'webpack-dev-server';

export const devProxy: ProxyConfigMap | ProxyConfigArray = {
  '/api': {
    target: 'http://localhost:5000',
    pathRewrite: {
      '^/api': '',
    },
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
  },
};
