var gulp = require('gulp');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default', ['bundle']);

gulp.task("bundle", function () {
  /* These Browserify settings will make a bundle file that is a standalone
     module that can run on Node, rather than a bundle meant to be used in a
     script tag on a webpage. */
  var b = browserify({
    entries: './tweet.js',
    browserField : false,
    builtins : false,
    commondir : false,
    insertGlobalVars : {
        process: undefined,
        global: undefined,
        'Buffer.isBuffer': undefined,
        Buffer: undefined
    },
    standalone: 'index',
  });

  return b.bundle()
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(gulp.dest("./dist"));
});
