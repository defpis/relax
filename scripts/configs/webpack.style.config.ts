import { RuleSetRule } from 'webpack';
import { resolveRoot } from '../utils';

export const genStyleRules = (): RuleSetRule[] => {
  return [
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            hoistUseStatements: true,
            resources: ['variables/*.scss'].map((path) => resolveRoot('src/styles', path)),
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ];
};
