module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'import/extensions': ['.js', '.ts'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'global-require': 0,
    'import/extensions': [
      0,
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'operator-linebreak': 0,
  },
};
