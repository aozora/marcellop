/**
 * @type {import("@remix-run/dev").AppConfig}
 */
module.exports = {
  // future: {
  //   v2_routeConvention: true,
  //   v2_errorBoundary: true
  // },
  // future: {
  //   unstable_cssModules: true
  // },
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: [
    "**/.*",
    "**/*.css",
    "**.{css,scss}",
    "**/*.test.{js,jsx,ts,tsx}",
  ],
};
