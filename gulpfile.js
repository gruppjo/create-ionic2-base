var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
  scssOrigin: 'styles.scss',
  scssApp: 'app/**/*.scss',
};

gulp.task('scssOrigin', function () {
  return gulp.src(paths.scssOrigin)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({includePaths: ['node_modules/ionicons/dist/scss']}).on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer({ browsers: ['last 2 versions'], remove: false}))
    .pipe(gulp.dest('./'));
});

gulp.task('scssApp', function () {
  return gulp.src(paths.scssApp, { base: './' })
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync().on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer({ browsers: ['last 2 versions'], remove: false}))
    .pipe(gulp.dest('./'));
});

gulp.task('scss', gulp.parallel('scssOrigin', 'scssApp'));

var createWatchers = function () {
  var watchScssOrigin = gulp.watch(paths.scssOrigin);
  watchScssOrigin.on('all', gulp.series('scssOrigin'));

  var watchScssApp = gulp.watch(paths.scssApp);
  watchScssApp.on('all', gulp.series('scssApp'));
};


gulp.task('watch', gulp.parallel('scss', createWatchers));
