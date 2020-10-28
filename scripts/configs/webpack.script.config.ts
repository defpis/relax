import { RuleSetRule } from "webpack";

export const genScriptConfig = (refresh = false): RuleSetRule => {
  return {
    test: /\.(tsx?|js)$/,
    loader: "babel-loader",
    exclude: /node_modules/,
    options: {
      plugins: refresh ? ["react-refresh/babel"] : [],
    },
  };
};
