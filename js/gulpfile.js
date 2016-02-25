'use strict';

/**
 * Require dependencies
 */
var gulp = require('gulp'),
    cache = require('gulp-cached'),
    beep = require('beepbeep'),
    plumber = require('gulp-plumber'),
    lint = require('gulp-jshint');

/**
 * Setup files to watch
 */
var files = [
  '**/*.js',
  '!gulpfile.js',
  '!node_modules/**/*.*'
];

/**
 * Error handling
 */
var gulp_src = gulp.src;

gulp.src = function() {
  return gulp_src.apply(gulp, arguments)

  .pipe(plumber(function(error) {
    beep();
  }));
};

/**
 * JavaScript lint
 */
gulp.task('lint', function() {
  return gulp.src(files)

  // Use cache to filter out unmodified files
  .pipe(cache('lint'))

  // Lint
  .pipe(lint())

  // Report errors
  .pipe(lint.reporter())

  // Make reporter fail task on error
  .pipe(lint.reporter('fail'));
});

/**
 * Watch
 */
gulp.task('default', function() {
  gulp.watch(files, ['lint']);
});
