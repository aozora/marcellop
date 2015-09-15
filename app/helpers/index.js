var config = require('../config');
var url = require('url');
var coreHelpers = {},
    registerHelpers,
    hbs = require('express-hbs'),
    _ = require('lodash'),
    assetTemplate = _.template('<%= source %>?v=<%= version %>');


// ### Asset helper
//
// *Usage example:*
// `{{asset "css/screen.css"}}`
// `{{asset "css/screen.css" ghost="true"}}`
// Returns the path to the specified asset. The ghost
// flag outputs the asset path for the Ghost admin
coreHelpers.asset = function (context, options) {
   var output = '',
      subdir,
      localPath = '';


   // Parse local path location
   if (config().url) {
      localPath = url.parse(config().url).path;
      // Remove trailing slash
      if (localPath !== '/') {
         localPath = localPath.replace(/\/$/, '');
      }
   }

   subdir = localPath === '/' ? '' : localPath;


   output += subdir + '/';

   if (!context.match(/^favicon\.ico$/) && !context.match(/^shared/) && !context.match(/^asset/)) {
      output += 'assets/';
   }

   // Get rid of any leading slash on the context
   context = context.replace(/^\//, '');
   output += context;

   if (!context.match(/^favicon\.ico$/)) {
      output = assetTemplate({
         source: output,
         version: coreHelpers.assetHash
      });
   }

   return new hbs.handlebars.SafeString(output);
};


// Register a handlebars helper for themes
function registerThemeHelper(name, fn) {
   hbs.registerHelper(name, fn);
}


registerHelpers = function (adminHbs, assetHash) {

   // Store hash for assets
   coreHelpers.assetHash = assetHash;

   // Register theme helpers
   registerThemeHelper('asset', coreHelpers.asset);
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerHelpers;
module.exports.registerThemeHelper = registerThemeHelper;








//   (function () {
//   'use strict';
//
//   // Register a handlebars helper for themes
//   function registerThemeHelper(name, fn) {
//      hbs.registerHelper(name, fn);
//   }
//
//
//   Handlebars.registerHelper('asset', function (context, options) {
//   var output = '',
//      isAdmin = options && options.hash && options.hash.ghost;
//
//   output += Ghost.paths.subdir + '/';
//
//   if (!context.match(/^shared/)) {
//      if (isAdmin) {
//         output += 'ghost/';
//      } else {
//         output += 'assets/';
//      }
//   }
//
//   output += context;
//   return new Handlebars.SafeString(output);
//});
//
//}());