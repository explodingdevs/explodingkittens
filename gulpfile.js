//Variables
var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var prettier = require('gulp-prettier')
var replace = require('gulp-replace')
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//File Paths
var sassFiles = 'sass/**/*.scss',
	mainSassFile = 'sass/style.scss',
	cssFiles = '.',
	sourceMaps = '/source/maps',
	styleSheet = './style.css'
currentDate = new Date().toISOString()

// BrowserSync
// function browserSync(done) {
// 	browsersync.init({
// 	  proxy: 'http://blackboxcakery.local'
// 	});
// 	done();
//   } 

//Compile main sass into css
function sassy() {
	return gulp
		.src(mainSassFile)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //Using gulp-sass
		.pipe(sourcemaps.write(sourceMaps))
		.pipe(gulp.dest('./_includes/css'))
}

// //Watch for changes in sass files and running sass compile
function watch() {
	// browserSync.init({
	// 	proxy: 'http://localhost:8080'
	//   });

	gulp.watch(sassFiles, sassy)
	gulp.watch([
		"./sass/**/*.scss"
	])
}

function styleVersion() {
	var thisVersion = styleSheet + '?v=' + currentDate

	return gulp
		.src(['header.php'])
		.pipe(replace(styleSheet, thisVersion))
		.pipe(gulp.dest('./'))
}

exports.sassy = sassy
exports.watch = watch
exports.styleVersion = styleVersion
