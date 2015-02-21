'use strict';

/**
 * Module Dependencies
 */

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var less = require('gulp-less');
var open = require('gulp-open');

/**
 * Process CSS
 */

gulp.task('styles', function () {
  return gulp.src('./assets/less/*.less')
    .pipe(less({}))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

/**
 * Nodemon
 */

gulp.task('nodemon', function (cb) {
  livereload.listen();
  var called = false;
  nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    setTimeout(function () {
      if (!called) {
        called = true;
        cb();
      }
    }, 1000);
  })
  .on('restart', function () {
    setTimeout(function () {
      livereload.changed('/');
    }, 1000);
  });
});

/**
 * Open the browser
 */

gulp.task('open', ['nodemon'], function () {
  var options = {
    url: 'http://localhost:3000/'
  };
  // any file or gulp will skip the task
  gulp.src('./views/*.ejs')
  .pipe(open('', options));
});

/**
 * Default
 */

gulp.task('default', ['open', 'styles'], function () {
  gulp.watch('views/*.ejs').on('change', livereload.changed);
  gulp.watch('./assets/*.less', ['styles']);
});