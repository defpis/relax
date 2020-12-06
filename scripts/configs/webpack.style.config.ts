import { RuleSetRule } from 'webpack';
import { resolveRoot } from '../utils';

export const genStyleRules = (): RuleSetRule[] => {
  return [
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            hoistUseStatements: true,
            resources: ['variables/*.scss', 'mixins/*.scss'].map((path) => resolveRoot('src/styles', path)),
          },
        },
      ],
    },
  ];
};
