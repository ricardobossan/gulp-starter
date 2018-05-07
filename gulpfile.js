/*
TODO
-->IMPLEMENT the 'styles' TASK (16m06s, of the /DESKTOP/'0._16m06s_Gulp Build System Part 3 Gulp File.mp4')<--
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css')
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer')

// MINIFY JS FILES
gulp.task('scripts', function() {
	gulp.src(['app/**/*.js', '!app/**/*.min.js'])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
})

// USES SASS
gulp.task('styles', function() {
	gulp.src('app/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe((minifyCSS({compatibility: 'ie8'})))
		.pipe(gulp.dest('app/css'))
})

// WATCHES/AUTOMATICALLY UPDATES FILES
gulp.task('watch', function() {
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/sass/**/*.scss', ['styles']);
})

// DEFAULT TASK
gulp.task('default', ['scripts', 'styles', 'watch']);