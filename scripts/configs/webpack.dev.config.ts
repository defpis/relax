import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { merge } from "webpack-merge";
import webpackBaseConfig from "./webpack.base.config";
import { genScriptConfig } from "./webpack.script.config";

const webpackDevConfig = merge(webpackBaseConfig, {
  devtool: "eval-source-map",
  mode: "development",
  module: {
    rules: [genScriptConfig(true)],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});

export default webpackDevConfig;
