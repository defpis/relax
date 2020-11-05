import path from 'path';
import { webpack } from 'webpack';
import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import webpackDevConfig from './configs/webpack.dev.config';
import { DEV_HOST, DEV_PORT, PROJECT_ROOT, PUBLIC_PATH } from './configs/constants';

const options: Configuration = {
  contentBase: path.resolve(PROJECT_ROOT, 'dist'),
  historyApiFallback: true,
  hot: true,
  open: false,
  publicPath: PUBLIC_PATH,
  stats: 'minimal',
};

WebpackDevServer.addDevServerEntrypoints(webpackDevConfig, options);
const compiler = webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(DEV_PORT, DEV_HOST, (err) => {
  if (err) {
    console.error(err);
  }
});
