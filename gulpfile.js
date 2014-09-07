var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var del = require('del');

var paths = {
    sass: './sass/*.scss',
    js: ['./public/bower_components/highlight/build/highlight.pack.js'],
    css: ['./public/css/main.css', './public/bower_components/highlight/src/styles/monokai.css']
};

gulp.task('clean', function (cb) {
    del(['./public/dist'], cb);
});

gulp.task('uglify', ['clean'], function () {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/js/'));
});

gulp.task('sass', function () {
    return gulp.src('./sass/main.scss')
      .pipe(sass({style: 'expanded', unixNewlines: true}))
      .on('error', function (err) { console.log(err.message); })
      .pipe(gulp.dest('./public/css/'));
});

gulp.task('compact-css', ['clean'], function () {
    gulp.src(paths.css)
      .pipe(minifyCSS())
      .pipe(gulp.dest('./public/dist/css/'))
})


gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass', 'compact-css']);
});

gulp.task('default', ['sass', 'compact-css', 'uglify'], function() {
  // place code for your default task here
});
