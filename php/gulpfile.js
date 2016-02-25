'use strict';

/**
 * Require dependencies
 */
var gulp = require('gulp'),
    cache = require('gulp-cached'),
    beep = require('beepbeep'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    phpcs = require('gulp-phpcs');

/**
 * Setup files to watch
 */
var files = [
  '**/*.php',
  '!vendor/**/*.*',
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
}

/**
 * PHP CodeSniffer
 */
gulp.task('phpcs', function() {
  gulp.src(files)

  // Use cache to filter out unmodified files
  .pipe(cache('phpcs'))

  // Sniff code
  .pipe(phpcs({
    bin: '~/.composer/vendor/bin/phpcs',
    standard: 'PSR2',
    warningSeverity: 0
  }))

  // Log errors and fail afterwards
  .pipe(phpcs.reporter('log'))
  .pipe(phpcs.reporter('fail'))

  .pipe(livereload())
});

/**
 * Watch
 */
gulp.task('default', function() {
  gulp.watch(files, ['phpcs']);
  livereload.listen();
});
