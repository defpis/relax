import path from "path";
import { webpack } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackDevConfig from "./config/webpack.dev.config";
import {
  DEV_HOST,
  DEV_PORT,
  PROJECT_ROOT,
  PUBLIC_PATH,
} from "./config/constant";

const compiler = webpack(webpackDevConfig);

const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(PROJECT_ROOT, "public"),
  historyApiFallback: true,
  hot: true,
  open: true,
  publicPath: PUBLIC_PATH,
});

server.listen(DEV_PORT, DEV_HOST, (err) => {
  if (err) {
    console.error(err);
  }
});