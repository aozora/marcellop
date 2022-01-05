'use strict';

module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    'comma-dangle': ['error', 'never'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral']
      }
    ],
    'max-len': 'off',
    'no-console': [
      2,
      {
        allow: ['warn', 'error']
      }
    ],
    'import/prefer-default-export': 0,
    'import/no-anonymous-default-export': 0
  }
};
