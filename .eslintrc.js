module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    mocha: true,
  },
  plugins: [
    'mocha',
    'async-await',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'object-curly-newline': 0,
    'func-names': 0,
  },
};