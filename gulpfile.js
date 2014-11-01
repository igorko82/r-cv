var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    csscomb = require('gulp-csscomb'),
    minifyCSS = require('gulp-minify-css'),
    package = require('./package.json');


var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(plumber())
    //.pipe(sass({errLogToConsole: true}))
    .pipe(sass({bundleExec: true,
      require: 'sass-globbing'}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(csscomb())
    .pipe(gulp.dest('app/assets/stylesheets'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/stylesheets'))
});

gulp.task('js',function(){
  gulp.src([
    'src/js/scripts.js',
    'src/js/app.js'
    ])
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/javascripts'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/javascripts'))
});
gulp.task('plugins', function() {
  gulp.src([ 
    'src/js/plugins/jquery.simple-text-rotator.js',
    'src/js/plugins/classie.js',
    'src/js/plugins/circle-progress.js'
    ])
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/javascripts/plugins'))
});

gulp.task('default', ['css', 'js', 'plugins'], function () {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("src/scss/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("src/js/plugins/*.js", ['plugins']);
});