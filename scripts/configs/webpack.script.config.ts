import { RuleSetRule } from 'webpack';

interface IGenScriptRuleOptions {
  refresh: boolean;
}

export const genScriptRules = ({ refresh }: IGenScriptRuleOptions): RuleSetRule[] => {
  return [
    {
      test: /\.(tsx?|js)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        plugins: refresh ? ['react-refresh/babel'] : [],
      },
    },
  ];
};
