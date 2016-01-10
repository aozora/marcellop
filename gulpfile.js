// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//   `gulp _build`
//   `gulp bower-restore`
//   `gulp clean`
//   `gulp copy:hbs`
//   `gulp copy:css`
//   `gulp copy:lib`
//   `gulp copy:js`
//   `gulp critical`
//   `gulp ghost`
//   `gulp images`
//   `gulp less`
//   `gulp uncss`
//
// *************************************

// include plug-ins
var fs = require('fs');
var path = require('path');
var request = require('request');
var tmpDir = require('os').tmpdir();
var criticalcss = require('criticalcss');
var sequence = require('run-sequence');
var rimraf = require('rimraf');
// var browser = require('browser-sync');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulp.config.js')();


// setup gulp error handler
var plumberErrorHandler = {
  errorHandler: function (error) {
    $.notify.onError({
      title: 'Gulp Task',
      message: 'Error: <%= error.message %>'
    });
    $.util.log(error.toString());//Prints Error to Console
    this.emit('end'); //End function
  }
};


// ------------------------------------
// Task: clean
// Delete the destination theme folder
// -------------------------------------
gulp.task('clean', function (done) {
  rimraf(config.ghostTheme.root, done);
});


// ------------------------------------
// Task: bower-restore
// Restore all bower packages
// -------------------------------------
gulp.task('bower-restore', function () {
  return $.bower()
    .pipe($.plumber(plumberErrorHandler));
});


// -------------------------------------
// Task: less
// preprocess Canvas less files with
// sourcemaps
// -------------------------------------
gulp.task('less', function () {
  return gulp.src(config.paths.assets.less)
    .pipe($.plumber(plumberErrorHandler))
    .pipe($.sourcemaps.init())
    .pipe($.less(/* {paths: config.paths.less}*/))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe($.sourcemaps.write('./', {sourceRoot: '/src/assets/less/'}))
    .pipe(gulp.dest(config.ghostTheme.root + '/assets/css'));
});

// -------------------------------------
// Task: less-min
// preprocess Canvas less files with
// sourcemaps and minimized them
// -------------------------------------
gulp.task('less-min', function () {
  return gulp.src(config.paths.assets.less)
    .pipe($.plumber(plumberErrorHandler))
    .pipe($.sourcemaps.init())
    .pipe($.less(/* {paths: config.paths.less}*/))
    .pipe($.autoprefixer(config.autoprefixer))
    // minify
    .pipe($.rename({
      extname: '.min.css'
    }))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('./', {sourceRoot: '/src/assets/less/'}))
    .pipe(gulp.dest(config.ghostTheme.root + '/assets/css'));
});


// -------------------------------------
// Task: images
// Optimize images
// -------------------------------------
gulp.task('images', function () {
  return gulp.src('./src/images/**/*')
    .pipe($.plumber(plumberErrorHandler))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe($.size({title: 'images'}));
});


// -------------------------------------
// Task: uncss
// Removed unused css rules
// -------------------------------------
gulp.task('uncss', function () {
  return gulp.src([
      'Content/css/scw.min.css'
    ])
    .pipe($.uncss({
      html: [
        'http://localhost:8000/'
      ]
    }))
    .pipe(gulp.dest('Content/uncss/'));
});


// -------------------------------------
// Task: critical
// Critical CSS Task, see Filament Group
// https://github.com/filamentgroup/criticalcss
// -------------------------------------
gulp.task('critical', function () {

  var cssUrl = 'http://localhost:8000/theme.css';
  var cssPath = path.join(tmpDir, 'theme.css');
  var includePath = path.join(__dirname, 'Content/css/critical.css');

  request(cssUrl).pipe(fs.createWriteStream(cssPath)).on('close', function () {
    $.criticalcss.getRules(cssPath, function (err, output) {

      if (err) {
        throw new Error(err);
      } else {
        criticalcss.findCritical("http://localhost:8000/", {rules: JSON.parse(output)}, function (err, output) {
          if (err) {
            throw new Error(err);
          } else {
            fs.writeFile(includePath, output, function (err) {
              if (err) {
                return console.log(err);
              }
              console.log("Critical written to include!");
            });

          }
        });
      }
    });
  });

});


/**************************************************
 *                LINTERS
 **************************************************/

// -------------------------------------
// Task: csslint
// -------------------------------------
gulp.task('csslint', function () {
  return gulp.src(config.ghostTheme.root + '/assets/style.css')
    .pipe($.csslint(config.paths.settings.csslint))
    .pipe($.csslint.reporter())
    .pipe($.csslint.failReporter());
});


/**************************************************
 *              PAGES
 **************************************************/


// -------------------------------------
// Task: copy:hbs
// -------------------------------------
gulp.task('copy:hbs', function () {
  return gulp.src('./src//**/*.hbs')
    .pipe($.plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.ghostTheme.root));
});


// -------------------------------------
// Task: copy:css
// Copy static assets of the assets folder
// Less, Images, Hbs are excluded.
// -------------------------------------
gulp.task('copy:css', function () {
  return gulp.src(config.paths.assets.css)
    .pipe($.plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.ghostTheme.root + '/assets/css'));
});

// -------------------------------------
// Task: copy:lib
// Copy vendor js files
// -------------------------------------
gulp.task('copy:lib', function () {
  return gulp.src(config.paths.assets.lib)
    .pipe($.plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.ghostTheme.root + '/assets/js'));
});

// -------------------------------------
// Task: copy:js
// Lint custom js files and copy them to
// theme folder
// -------------------------------------
gulp.task('copy:js', function () {
  $.eslint.fix = true;

  return gulp.src(config.paths.assets.js)
    .pipe($.plumber(plumberErrorHandler))

    // ESLint
    .pipe($.eslint(config.paths.settings.eslint))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())

    .pipe(gulp.dest(config.ghostTheme.root + '/assets/js'));
});

// -------------------------------------
// Task: copy:fav
// Copy favicons
// -------------------------------------
gulp.task('copy:fav', function () {
  return gulp.src(config.paths.assets.favicons)
    .pipe($.plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.ghostTheme.root + '/assets/favicons'));
});

// -------------------------------------
// Task: copy:img
// Copy images
// -------------------------------------
gulp.task('copy:img', function () {
  return gulp.src(config.paths.assets.images)
    .pipe($.plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.ghostTheme.root + '/assets/images'));
});

// -------------------------------------
// Task: copy:revolution
// Copy assets for Revolution Slider
// -------------------------------------
gulp.task('copy:revolution', function () {
  return gulp.src(config.paths.assets.revolution)
    .pipe($.plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.ghostTheme.root + '/assets/rs-plugin'));
});

// -------------------------------------
// Task: copy:others
// Copy other files required by Ghost
// -------------------------------------
gulp.task('copy:others', function () {
  return gulp.src(config.paths.assets.others)
    .pipe($.plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.ghostTheme.root));
});


/**************************************************
 *              GHOST
 **************************************************/
gulp.task('ghost', function () {
  gulp.src('')
    .pipe($.exec('cd ' + config.ghostTheme.start + '; npm start'));
});


/**************************************************
 *              GULP DEFAULT TASKs
 **************************************************/

// Build the "dist" folder by running all of the above tasks
gulp.task('_build', function (done) {
  sequence('clean', [
    'less',
    'less-min',
    'csslint',
    'copy:hbs',
    'copy:css',
    'copy:lib',
    'copy:js',
    'copy:fav',
    'copy:img',
    'copy:revolution',
    'copy:others'
  ], done);
});


// -------------------------------------
// Task: default
// Build the site, run the server, and watch for file changes
// -------------------------------------
gulp.task('default', ['_build', 'bower-restore'], function () {

  gulp.watch('./src//**/*.hbs', ['copy:hbs']);

  gulp.watch(config.paths.assets.css, 'copy:css');
  gulp.watch(config.paths.assets.lib, 'copy:lib');
  gulp.watch(config.paths.assets.js, 'copy:js');
  gulp.watch(config.paths.assets.others, 'copy:others');

  gulp.watch([
    './src/assets/style.less',
    './src/assets/less/**/*'
  ], ['less', 'csslint']);

  //gulp.watch(['src/assets/img/**/*'], ['images', browser.reload]);
});
