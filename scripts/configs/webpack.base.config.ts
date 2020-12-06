import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { PROJECT_ROOT, PUBLIC_PATH } from './constants';
import { resolveRoot } from '../utils';

const allExtensions = ['.tsx', '.ts', '.js', '.json'];

export const webpackBaseConfig: Configuration = {
  context: PROJECT_ROOT,
  entry: [resolveRoot('./src/index.tsx')],
  output: {
    path: resolveRoot('dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    extensions: allExtensions,
    alias: {
      '@': resolveRoot('src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolveRoot('./public/index.html'),
      publicPath: PUBLIC_PATH,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: resolveRoot('public'),
          from: '**/*',
          to: resolveRoot('dist'),
          toType: 'dir',
          filter: (resourcePath) => ![/public\/index.html/].some((exclude) => exclude.test(resourcePath)),
        },
        {
          context: resolveRoot('src/assets'),
          from: '**/*',
          to: resolveRoot('dist/assets'),
          toType: 'dir',
        },
      ],
    }),
  ],
};
