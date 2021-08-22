module.exports = {
  env: {
    browser: true,
    node: true
  },
  rules: {
    'indent': ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-console': 1,
    'comma-dangle': [0],
    'arrow-parens': [0],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'always'],
    'no-return-await': 'off',
    'spaced-comment': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-multi-space': 'off',
  }
};
