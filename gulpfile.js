// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer= require('gulp-autoprefixer');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var del = require('del');
var minifycss = require('gulp-minify-css');
var iconify = require('gulp-iconify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('runnrz/public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('runnrz/public/scss/*.scss')
        .pipe(sass(
            { 
                style: 'expanded',
                errLogToConsole: false,
                onError: function(err) {
                    return notify().write(err);
                }
            }
        ))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('runnrz/public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss({ compatibility: 'ie8', noAdvanced: true }))
        .pipe(gulp.dest('runnrz/public/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Concatenate & Minify JS
gulp.task('libscripts', function() {
    return gulp.src([
            'runnrz/public/js/libs/jquery/dist/jquery.js',
            'runnrz/public/js/libs/holderjs/holder.js',
            'runnrz/public/js/libs/placeholders/dist/placeholders,jquery.js',
            'runnrz/public/js/libs/placeholders/dist/placeholders.js',
            'runnrz/public/js/libs/ladda/js/spin.js',
            'runnrz/public/js/libs/ladda/js/ladda.js',
            'runnrz/public/js/libs/bootstrap/dist/js/bootstrap.js',
            'runnrz/public/js/libs/moment/min/moment-with-locales.min.js',
            'runnrz/public/js/libs/angular/angular.js',
            'runnrz/public/js/libs/angular-animate/angular-animate.js',
            'runnrz/public/js/libs/angular-bootstrap/ui-bootstrap.js',
            'runnrz/public/js/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'runnrz/public/js/libs/angular-cookies/angular-cookies.js',
            'runnrz/public/js/libs/angular-holderjs/src/holder.js',
            'runnrz/public/js/libs/angular-ladda/dist/angular-ladda.js',
            'runnrz/public/js/libs/angular-mocks/angular-mocks.js',
            'runnrz/public/js/libs/angular-resource/angular-resource.js',
            'runnrz/public/js/libs/angular-route/angular-route.js',
            'runnrz/public/js/libs/angular-sanitize/angular-sanitize.js',
            'runnrz/public/js/libs/angular-touch/angular-touch.js',
            'runnrz/public/js/libs/angular-ui-router/release/angular-ui-router.js',
            'runnrz/public/js/libs/angular-ui-select/dist/select.js',
            'runnrz/public/js/libs/angular-ui-utils/ui-utils.js',
            'runnrz/public/js/libs/angular-ui-utils/ui-utils-ieshiv.js',
            'runnrz/public/js/libs/ngmap/build/scripts/ng-map.js',
            'runnrz/public/js/libs/oauth-ng/dist/oauth-ng.js',
            'runnrz/public/js/libs/angular-loading-bar/build/loading-bar.js',
            'runnrz/public/js/libs/angular-moment/angular-moment.js',
            'runnrz/public/js/libs/he/he.js',
            'runnrz/public/js/libs/ngstorage/ngStorage.js',
            'runnrz/public/js/libs/mapbox.js/mapbox.js',
            'runnrz/public/js/libs/cryptojslib/rollups/hmac-sha512.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('runnrz/public/js/dist'))
});

gulp.task('libcss', function() {
    return gulp.src([
            'runnrz/public/js/libs/bootstrap/dist/css/bootstrap.min.css',
            'runnrz/public/js/libs/ladda/dist/ladda-themeless.min.css',
            'runnrz/public/js/libs/angular-ui-select/dist/select.min.css',
            'runnrz/public/js/libs/angular-loading-bar/build/loading-bar.css',
            'runnrz/public/js/libs/mapbox.js/mapbox.css'
        ])
        .pipe(concat('_libs.min.css'))
        .pipe(gulp.dest('runnrz/public/css/'))
});

gulp.task('scripts', function() {
    return gulp.src(
            'runnrz/public/js/modules/**/**.js'
        )
        .pipe(concat('all.js'))
        .pipe(gulp.dest('runnrz/public/js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('runnrz/public/js/dist'))
        .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('images', function() {
  return gulp.src('/runnrz/public/imgs')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('/runnrz/public/imgs'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('svgs', function() {
    return iconify({
        errLogToConsole: false,
        onError: function(err) {
            return notify().write(err);
        },
        src: 'runnrz/public/imgs/svgs/*.svg',
        pngOutput: 'runnrz/public/imgs/svgs-pngs',
        scssOutput: 'runnrz/public/scss/svgs',
        cssOutput:  'runnrz/public/css/svgs'
    })
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('runnrz/public/js/modules/**', ['scripts']);
    gulp.watch('runnrz/public/scss/*.scss', ['sass']);
    gulp.watch('runnrz/public/imgs/svgs/*.svg', ['svgs']);
    gulp.watch('runnrz/public/imgs/*', ['images']);
});

// Default Task
gulp.task('default', ['lint', 'libcss', 'sass', 'svgs', 'images', 'libscripts', 'scripts', 'watch']);