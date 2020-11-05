import path from 'path';
import { RuleSetRule } from 'webpack';
import { PROJECT_ROOT } from './constants';

const resolveStyles = (p: string) => path.resolve(PROJECT_ROOT, 'src/styles', p);

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
            resources: ['variables/*.scss'].map((p) => resolveStyles(p)),
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
