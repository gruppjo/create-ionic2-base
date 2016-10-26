var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
  scss: ['styles.scss', 'app/**/*.scss'],
  scssOrigin: 'styles.scss',
  scssApp: 'app/**/*.scss',
};


// build styles to tmp
gulp.task('styles', function () {

  // compile css starting from each module's scss
  return gulp.src(paths.scss, { base: './' })
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({includePaths: ['node_modules/ionicons/dist/scss']}).on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer({ browsers: ['last 2 versions'], remove: false}))
    .pipe(gulp.dest('./'));
});

var createWatchers = function () {
  var watcher = gulp.watch(paths.scss);
  watcher.on('all', gulp.series('styles'));
};


gulp.task('watch', gulp.parallel('styles', createWatchers));
