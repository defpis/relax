import webpack from "webpack";
import webpackDevConfig from "./config/webpack.dev.config";

const compiler = webpack(webpackDevConfig);

compiler.run((err) => {
  if (err) {
    console.error(err);
  }
});
