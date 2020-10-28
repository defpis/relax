import path from "path";
import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { PROJECT_ROOT, PUBLIC_PATH } from "./constant";

const webpackBaseConfig: Configuration = {
  context: PROJECT_ROOT,
  entry: "./src/index.ts",
  output: {
    path: path.resolve(PROJECT_ROOT, "dist"),
    filename: "js/[name].[contenthash:8].js",
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: PUBLIC_PATH,
    }),
  ],
};

export default webpackBaseConfig;
