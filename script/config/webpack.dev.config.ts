import { merge } from "webpack-merge";
import webpackBaseConfig from "./webpack.base.config";

const webpackDevConfig = merge(webpackBaseConfig, {
  mode: "development",
});

export default webpackDevConfig;
