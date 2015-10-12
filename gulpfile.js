/**
 * Created by marcello.palmitessa on 30/09/2015.
 */
/// <vs BeforeBuild='default' />
///
// include plug-ins
var gulp = require('gulp');
var bower = require('gulp-bower');
var less = require('gulp-less');
var path = require('path');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var autoprefixer = require('gulp-autoprefixer');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');

var plumber = require('gulp-plumber'); // gulp error handler
var notify = require('gulp-notify');   // cross-platform notifier



// setup gulp error handler
var plumberErrorHandler = {
   errorHandler: notify.onError({
      title: 'Gulp Task',
      message: 'Error: <%= error.message %>'
   })
};


// Restore all bower packages
gulp.task('bower-restore', function () {
   return bower()
      .pipe(plumber(plumberErrorHandler));
});


//// preprocess Bootstrap less files
//gulp.task('bootstrap-less', function () {
//   return gulp.src('./client/style.less')
//      .pipe(plumber(plumberErrorHandler))
//      .pipe(less())
//      .pipe(gulp.dest('./public/css'));
//});


// preprocess custom less files
gulp.task('less', function () {
   //return gulp.src('./Content/less/custom/main.less')
   return gulp.src('./client/style.less')
      .pipe(plumber(plumberErrorHandler))
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./public/assets/css'));
});


gulp.task('jscs', function() {
  return gulp.src('app/**/*.js')
      .pipe(jscs({fix: true}))
      .pipe(jscs.reporter())
      .pipe(jscs.reporter('fail'))
      .pipe(gulp.dest('app'));
});


gulp.task('lint', function () {
   return gulp.src(['app/**/*.js'])
      // eslint() attaches the lint output to the eslint property
      // of the file object so it can be used by other modules.
       .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
       .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
       .pipe(eslint.failAfterError());
});

// Set a default tasks
gulp.task('default', ['bower-restore', 'less', 'lint'], function () {
});