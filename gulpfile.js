var gulp = require('gulp');
var babel = require('gulp-babel');
var run = require('gulp-run');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('transpile-app', function() {
    return gulp.src('app/index.es6.js')
    .pipe(babel())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('app'));
});


gulp.task('styles', function() {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./browser/css'))
        .pipe(livereload());
});

gulp.task('run', ['default'], function() {
    return run('electron app').exec();
});

gulp.task('default', ['transpile-app', 'styles']);

gulp.task('watch', ['styles'], function() {
    livereload.listen();
    gulp.watch('browser/scss/*.scss', ['styles']);
    gulp.watch('browser/scss/**/*.scss', ['styles']);
    gulp.watch('app/index.es6.js', ['transpile-app']);
});
