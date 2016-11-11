var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync').create('ci2a');
var Builder = require('systemjs-builder');

var paths = {
  scssOrigin: 'src/styles.scss',
  scssApp: 'src/app/**/*.scss',
  all: ['src/**/*.css', 'src/**/*.js', 'src/**/*.html'],
  dist: 'www'
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

gulp.task('static.css', gulp.series('scss', function () {
  return gulp.src('src/styles.css')
    .pipe(gulp.dest(paths.dist));
}));
gulp.task('static.components', function () {
  return gulp.src('src/app/**/*.{html,css}')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build.static', gulp.series('scss', gulp.parallel('static.css', 'static.components')));

gulp.task('build.js', function buildSJS (done) {
  var builderConf = {
    normalize: true,
    minify: true,
    mangle: true,
    runtime: false,
    globalDefs: {
        DEBUG: false,
        ENV: 'production'
    }
  };

  var builder = new Builder();
  builder.loadConfig('./src/systemjs.config.js')
  .then(function() {
    return builder
      .buildStatic(
        './src/app/main.js',
        paths.dist + '/bundle.js',
        builderConf);
  })
  .then(function(output) {
    console.log(output.inlineMap);
    console.log('Build complete');
    done();
  })
  .catch(function (ex) {
    console.log('Build failed', ex);
    done('Build failed.');
  });
});

gulp.task('build', gulp.parallel('build.static', 'build.js'));



gulp.task('watch',
  gulp.series(
    gulp.parallel('scss', createWatchers),
    function () {
      var bsOptions = {
        server: {
          baseDir: ['./src', '.']
        },
        open: false
      }
      bs.init(bsOptions);
    }
  )
);
