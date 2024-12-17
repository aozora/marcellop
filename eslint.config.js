import eslintPluginAstro from "eslint-plugin-astro";
// import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  // jsxA11y.flatConfigs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];
