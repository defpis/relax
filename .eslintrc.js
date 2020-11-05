module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {
        project: ['./src/tsconfig.json', './scripts/tsconfig.json'],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        tsx: 'never',
        ts: 'never',
        js: 'never',
        json: 'never',
      },
    ],
    'import/prefer-default-export': ['off'],
    'import/no-extraneous-dependencies': ['off'],

    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', 'ts', '.js'] }],

    '@typescript-eslint/no-use-before-define': ['warn'],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/ban-types': ['warn'],
    '@typescript-eslint/explicit-module-boundary-types': ['warn'],

    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          camelCase: true,
          snakeCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': ['off'],
    'unicorn/prefer-query-selector': ['error'],

    'no-use-before-define': ['off'],
    'no-console': ['off'],
  },
};
