const gulp = require('gulp');
const del = require('del');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');

const sass = gulpSass(dartSass);

gulp.task('clean', () => {
    return del([
        'dist/**/*',
    ]);
});

gulp.task('copy', () => {
    return gulp.src('./src/**/*[!.scss]')
        .pipe(gulp.dest('./dist'));
});

gulp.task('buildScss', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'buildScss')));
gulp.task('watch', (callback) => {
    gulp.watch(['./src/**/*'], gulp.series('build'));
    callback();
});
