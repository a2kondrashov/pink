var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-minify-css'),
	mainBowerFiles = require('main-bower-files'),
	bowerFiles = mainBowerFiles(),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	templateData = require('./src/data/data.json');

console.info('********** Bower Files **********');
console.info(bowerFiles);

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'copyAssets',
	'browser-sync',
	'handlebars',
	// 'pluginsConcat',
	'jsConcat',
	'less',
	'watch'
]);

/******************************
 * Build task
 ******************************/
gulp.task('build', [
	'copyAssets',
	'handlebars',
	// 'pluginsConcat',
	'jsConcat',
	'less-min'
]);

/******************************
 * Build task
 ******************************/
gulp.task('server', [
	'browser-sync'
]);

/******************************
 * Copy assets to build
 ******************************/
gulp.task('copyAssets', function () {
	'use strict';
	gulp.src([
		'src/img/**/*.jpg',
		'src/img/**/*.png',
		'src/img/**/*.svg'
		// '!assets/**/*.less'
	])
		.pipe(gulp.dest('build/img'));
});

/******************************
 * Handlebars
 ******************************/
gulp.task('handlebars', function () {
	gulp.src('src/templates/*.handlebars')
		.pipe(handlebars(templateData, {
			ignorePartials: true, //ignores the unknown partials
			batch: ['./src/templates/partials']
		}))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('./build'));
});

/******************************
 * JS plugins
 ******************************/
gulp.task('pluginsConcat', function () {
	gulp.src(bowerFiles)
		.pipe(concat('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

/******************************
 * JS concat
 ******************************/
gulp.task('jsConcat', function () {
	gulp.src(['src/js/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(uglify())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while uglifying js.\nLook in the console for details.\n' + error;
		}))
		.pipe(sourcemaps.write('../js'))
		.pipe(gulp.dest('build/js'));
});

/******************************
 * Browser sync
 ******************************/
gulp.task('browser-sync', function () {
	var files = [
		'build/**/*.html',
		'build/js/**/*.js',
		'build/css/**/*.css'
	];

	browserSync.init(files, {
		server: {
			baseDir: './build'
		},
		open: false
	});
});

/******************************
 * Watch
 ******************************/
gulp.task('watch', function () {
	gulp.watch('src/less/*.less', ['less']);
	gulp.watch('src/js/**/*.js', ['jsConcat']);
	gulp.watch('src/templates/**/*.handlebars', ['handlebars']);
});

/******************************
 * Less
 ******************************/
gulp.task('less', function () {
	gulp.src('src/less/style.less')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('build/css'));
});

/******************************
 * Less min
 ******************************/
gulp.task('less-min', function () {
	gulp.src('src/less/style.less')
		.pipe(plumber())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(minifyCSS({
			keepBreaks: false,
			keepSpecialComments: true,
			benchmark: false,
			debug: true
		}))
		.pipe(gulp.dest('build/css'));
});
