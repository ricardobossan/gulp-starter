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
var browserSync = require('browser-sync')
var bSCreate = require('browser-sync').create();

// allow to fix scss file without interrupting the watch task
var plumber = require('gulp-plumber')

// MINIFY JS FILES
gulp.task('scripts', function() {
	gulp.src(['app/**/*.js', '!app/**/*.min.js'])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
		browserSync.reload();

})

// USES SASS
gulp.task('styles', function() {
	gulp.src('app/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe((minifyCSS({compatibility: 'ie8'})))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

// UPDATES HTML FOR THE WATCH TASK
gulp.task('html', function() {
	gulp.src('app/**/*.html')
		.pipe(bSCreate.reload({stream:true}))
})

// CONFIGURE BROWSER-SYNC
gulp.task('browser-sync+server', function () {
	browserSync.init({
		server:{
			baseDir: "./app/"
		}
	});
});

// WATCHES/AUTOMATICALLY UPDATES FILES
gulp.task('watch', function() {
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/sass/**/*.scss', ['styles']);
	gulp.watch('app/**/*.html', ['html']).on('change', browserSync.reload);
});

// DEFAULT TASK
gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync+server', 'watch']);