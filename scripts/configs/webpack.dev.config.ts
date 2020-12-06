import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { merge } from 'webpack-merge';
import { webpackBaseConfig } from './webpack.base.config';
import { genStyleRules } from './webpack.style.config';
import { genScriptRules } from './webpack.script.config';
import { resolveRoot } from '../utils';

const REFRESH = false;

export const webpackDevConfig = merge(webpackBaseConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: [resolveRoot('./src/mocks/index.ts')],
  module: {
    rules: [...genStyleRules(), ...genScriptRules({ refresh: REFRESH })],
  },
  plugins: [
    ...(REFRESH ? [new ReactRefreshWebpackPlugin()] : []),
    new StylelintWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: resolveRoot('./src/**/*.{tsx,ts,js}'),
      },
      typescript: {
        configFile: resolveRoot('./src/tsconfig.json'),
      },
    }),
  ],
});
