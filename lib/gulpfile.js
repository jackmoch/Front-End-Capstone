"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');



gulp.task('lint', function() {
  return gulp.src(['../app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function() {});
});

gulp.task('sass', function() {
  return gulp.src('../sass/**/*.s*ss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../styles'));
});

gulp.task('watch', function() {
  gulp.watch(['../app/**/*.js', '../sass/**/*.s*ss'], ['lint', 'sass']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['lint', 'sass', 'watch']);