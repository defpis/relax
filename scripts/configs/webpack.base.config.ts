import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { PROJECT_ROOT, PUBLIC_PATH } from './constants';

const allExtensions = ['.tsx', '.ts', '.js', '.json'];

const webpackBaseConfig: Configuration = {
  context: PROJECT_ROOT,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(PROJECT_ROOT, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    extensions: allExtensions,
    alias: {
      '@': path.resolve(PROJECT_ROOT, 'src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: PUBLIC_PATH,
    }),
  ],
};

export default webpackBaseConfig;
