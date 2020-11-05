import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { merge } from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';
import { genStyleRules } from './webpack.style.config';
import { genScriptRules } from './webpack.script.config';

const webpackDevConfig = merge(webpackBaseConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  module: {
    rules: [...genStyleRules(), ...genScriptRules({ refresh: true })],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});

export default webpackDevConfig;
