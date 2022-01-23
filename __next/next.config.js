const path = require('path');

module.exports = {
  env: {
    publicUrl: 'https://www.marcellop.com/'
  },
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
