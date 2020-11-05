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
    'import/extensions': ['.tsx', '.ts', '.js', '.json'],
    'import/external-module-folders': ['node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.tsx', '.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
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

    'unicorn/filename-case': ['error', { cases: { pascalCase: true, snakeCase: true } }],
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