module.exports = {
  extends: ['airbnb-base'],
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script',
  },
  rules: {
    'no-console': 'off',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'max-len': ['error', { ignoreComments: true, code: 130 }],
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'guard-for-in': 'off',
    'class-methods-use-this': ['off'],
    'no-constant-condition': ['off'],
  },
};
