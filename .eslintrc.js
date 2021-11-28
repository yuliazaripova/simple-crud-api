module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  ignorePatterns: ['node_modules/', 'tests/'],
  rules: {
  },
};
