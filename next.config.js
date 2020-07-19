const path = require('path');

module.exports = {
  target: 'serverless',
  exportTrailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
