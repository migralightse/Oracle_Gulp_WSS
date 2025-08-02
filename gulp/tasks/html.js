var gulp        = require('gulp' );
var config      = require('../config');
var mode        = require('gulp-mode')();
var htmlmin     = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var formatHtml  = require('gulp-format-html');
var fileinclude = require('gulp-file-include');
var cachebust   = require('gulp-cache-bust');
var rename 		= require('gulp-rename');

var reload      = browserSync.reload;

const htmlminOptions = {
    removeComments: true,
    collapseWhitespace: true,
    preserveLineBreaks: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
};

const cachebustOptions = {
    type: 'timestamp',
};

gulp.task( 'html', (done) => {
    gulp.src( config.src.root + '*.html')
    .pipe(fileinclude())
    .pipe(mode.production(htmlmin(htmlminOptions)))
    .pipe(mode.production(cachebust(cachebustOptions)))
    .pipe(mode.production(formatHtml()))
    .pipe(gulp.dest( config.dest.root ))
    .pipe(browserSync.stream());

	gulp.src( config.src.sections + '*.html')
		.pipe(fileinclude())
		.pipe(mode.production(htmlmin(htmlminOptions)))
		.pipe(mode.production(cachebust(cachebustOptions)))
		.pipe(mode.production(formatHtml()))
		// .pipe(rename({ extname: '.liquid' }))
		// .pipe(gulp.dest( config.theme.sections ))
		.pipe(browserSync.stream());

	gulp.src( config.src.snippets + '*.html')
		.pipe(fileinclude())
		.pipe(mode.production(htmlmin(htmlminOptions)))
		.pipe(mode.production(cachebust(cachebustOptions)))
		.pipe(mode.production(formatHtml()))
		// .pipe(rename({ extname: '.liquid' }))
		// .pipe(gulp.dest( config.theme.snippets ))
		.pipe(browserSync.stream());

    done()
});

gulp.task('html:watch', () => {
    gulp.watch([
        config.src.root + '**/*.html',
    ], gulp.series('html', (done) => {
        reload()
        done()
    }))
})
