const { src, dest, series, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
/*const browserSync = require('browser-sync').create();*/
function html(){
    return src('src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest('build'));
}
function css(){
    return src('src/css/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(rename('index.css'))
        .pipe(dest('build'))
}

function images() {
    return src('src/assets/*')
        .pipe(imagemin())
        .pipe(dest('build/assets'))
}

function clean(){
    return del(['./build/*'])
}

/*function dev(){
    browserSync.init({
        server: './build'
    });
    watch('src/*.html', html);
    watch('src/css/*.scss', css);
    watch('src/assets/*', images);
}*/

function build(){
    return series(clean, parallel(css), images, html);
}

exports.build = build();
exports.dev = series(clean, build());
