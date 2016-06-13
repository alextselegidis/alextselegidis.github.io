var gulp = require('gulp'); 
var rename = require('gulp-rename'); 

gulp.task('css', function() {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

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

gulp.task('watch', function() {
    gulp.watch('styles.pcss', ['css']);
}); 
