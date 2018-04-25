var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

var htmlSources = ['*.html'];
var jsSources = ['development/app.js'];
var cssSources = ['css/*.css'];

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});
gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(cssSources)
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(jsSources)
        .transform(babelify)
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest('js/'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(htmlSources, ['html']);
    gulp.watch(cssSources, ['css']);
    gulp.watch(jsSources, ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'connect', 'watch']);