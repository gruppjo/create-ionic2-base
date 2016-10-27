var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync').create('ci2a');


var paths = {
  scssOrigin: 'src/styles.scss',
  scssApp: 'src/app/**/*.scss',
  all: ['src/**/*.css', 'src/**/*.js', 'src/**/*.html']
};

gulp.task('scssOrigin', function () {
  return gulp.src(paths.scssOrigin, { base: './' })
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

var createWatchers = function (done) {
  var watchScssOrigin = gulp.watch(paths.scssOrigin);
  watchScssOrigin.on('all', gulp.series('scssOrigin'));

  var watchScssApp = gulp.watch(paths.scssApp);
  watchScssApp.on('all', gulp.series('scssApp'));

  var watchAll = gulp.watch(paths.all);
  watchAll.on('all', function () {
    bs.reload();
  })
  done();
};


gulp.task('watch',
  gulp.series(
    gulp.parallel('scss', createWatchers),
    function () {
      var bsOptions = {
        server: {
          baseDir: ['./src', './node_modules']
        },
        open: false
      }
      bs.init(bsOptions);
    }
  )
);
