const allExtensions = ['.tsx', '.ts', '.js', '.json'];

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'promise', 'unicorn'],
  settings: {
    'import/extensions': allExtensions,
    'import/external-module-folders': ['node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': allExtensions,
    },
    'import/resolver': {
      node: {
        extensions: allExtensions,
      },
      typescript: {
        project: ['./src/tsconfig.json', './scripts/tsconfig.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/unicorn',
  ],
  rules: {
    '@typescript-eslint/ban-types': 'warn',

    'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true } }],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          dev: {
            development: false,
          },
          err: {
            error: false,
          },
        },
      },
    ],
  },
};
