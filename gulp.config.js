/**
 * GULP file configuration
 * @returns {{websiteRoot: string, sitecoreLibraries: string, solutionName: string, buildConfiguration: string}}
 */
module.exports = function () {
  var config = {


    paths: {
      // settings paths
      settings: {
        eslint: '.eslintrc',
        csslint: '.csslintrc'
      },

      assets: {
        css: [
          './src/assets/css/**/*',
          'bower_components/bootstrap/dist/css/bootstrap.*'
        ],
        lib: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          './src/assets/js/jquery.easing.1.3.js',
          'bower_components/jquery.stellar/jquery.stellar.js'
        ],
        js: [
          './src/assets/js/main.js'
        ],
        less: [
          './src/assets/style.less',
          './src/assets/less/dark.less',
          './src/assets/less/responsive.less'
        ],
        favicons: [
          './src/assets/favicons/*'
        ],
        images: [
          './src/assets/images/**/*'
        ],
        revolution: [
          './src/assets/rs-plugin/**/*'
        ],
        others: [
          './src/package.json'
        ]
      },
      lessIncludes: [
        'bower_components/bootstrap/less'
      ]
    },

    uncss: [],

    // autoprefixer config
    autoprefixer: [
      'last 2 version'
    ]
  };

  return config;
};
