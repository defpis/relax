import { HotModuleReplacementPlugin } from "webpack";
import { merge } from "webpack-merge";
import webpackBaseConfig from "./webpack.base.config";

const webpackDevConfig = merge(webpackBaseConfig, {
  mode: "development",
  plugins: [new HotModuleReplacementPlugin() /* TODO */],
});

export default webpackDevConfig;
