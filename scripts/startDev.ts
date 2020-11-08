import { webpack } from 'webpack';
import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import { webpackDevConfig, DEV_HOST, DEV_PORT, PUBLIC_PATH, devProxy } from './configs';
import { resolveRoot } from './utils';

const options: Configuration = {
  contentBase: resolveRoot('dist'),
  historyApiFallback: true,
  hot: true,
  open: false,
  publicPath: PUBLIC_PATH,
  stats: 'minimal',
  proxy: devProxy,
};

WebpackDevServer.addDevServerEntrypoints(webpackDevConfig, options);
const compiler = webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(DEV_PORT, DEV_HOST, (err) => {
  if (err) {
    console.error(err);
  }
});
