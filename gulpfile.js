var gulp = require('gulp')
  , KarmaServer = require('karma').Server
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , rename = require('gulp-rename')
  , uglify = require('gulp-uglify')
  , umd = require('gulp-umd')

gulp.task('test', function (done) {
  new KarmaServer({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start()
})

gulp.task('build', function() {
  var browserifyStream = browserify({
        entries: 'src/index.js',
        insertGlobals: false,
        debug: false,
      })
  return browserifyStream.bundle()
    .pipe(source('angular-request-loading.min.js'))
    .pipe(umd({
      exports: function(file) {return 'AngularloadingRequest'},
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})
