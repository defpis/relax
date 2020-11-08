import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { merge } from 'webpack-merge';
import { webpackBaseConfig } from './webpack.base.config';
import { genStyleRules } from './webpack.style.config';
import { genScriptRules } from './webpack.script.config';
import { resolveRoot } from '../utils';

export const webpackDevConfig = merge(webpackBaseConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: [resolveRoot('./scripts/mock/index.ts')],
  module: {
    rules: [...genStyleRules(), ...genScriptRules({ refresh: true })],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
