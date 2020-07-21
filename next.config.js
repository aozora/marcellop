const path = require('path');
// const sitemap = require('nextjs-sitemap-generator');

// sitemap({
//   baseUrl: 'https://www.marcellop.com',
//   pagesDirectory: `${__dirname }/pages`,
//   targetDirectory: 'static/'
// });

module.exports = {
  target: 'serverless',
  exportTrailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
