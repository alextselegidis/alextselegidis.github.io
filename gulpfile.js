/*

Personal Website - https://alextselegidis.com

Copyright (C) 2020 Alex Tselegidis <alextselegidis@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

const gulp = require('gulp');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const serve = require('gulp-connect');
const opener = require('opener');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('svg', function () {
    return gulp.src('images/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('images/'));
});

gulp.task('styles', function () {
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

gulp.task('serve', function(async) {
    serve.server({
        root: '.',
        port: 3000,
        livereload: true
    });
    opener('http://localhost:3000');
    async();
});

gulp.task('watch', function () {
    gulp.watch('styles.pcss', gulp.series('styles'));
    gulp.watch('images/*.svg', gulp.series('svg'));
});

gulp.task('dev', gulp.parallel('serve', 'watch'));

gulp.task('default', gulp.parallel('svg', 'styles'));
