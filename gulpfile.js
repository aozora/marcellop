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
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
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


// jshint task
gulp.task('jshint', function () {
   gulp.src('./Content/js/*.js')
      .pipe(plumber(plumberErrorHandler))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish')); // show jshint errors
   //.pipe(jshint.reporter('fail'));           // task will fail if any errors
});


// Set a default tasks
gulp.task('default', ['bower-restore', 'less', 'jshint'], function () {
});