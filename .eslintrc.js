module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },

  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ["gridsome"],
  extends: [
    'plugin:vue/recommended',
    'plugin:gridsome/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/no-v-html': 'off',
    'linebreak-style': ['off'],
    'padded-blocks': ['off'],
    'max-len': ['off'],
    'semi': ['error', 'always']
  }
}
