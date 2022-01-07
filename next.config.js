const path = require('path');

module.exports = {
  // target: 'serverless',
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
