const gulp = require('gulp');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('svg', function () {
    return gulp.src('images/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('images/'));
});

gulp.task('css', function () {
    return gulp.src('styles.pcss')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('autoprefixer'),
            require('precss'),
            require('postcss-color-function'),
            require('cssnano')
        ]))
        .pipe(sourcemaps.write())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch('styles.pcss', ['css']);
}); 
