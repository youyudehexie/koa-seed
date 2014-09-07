var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concatCss = require('gulp-concat-css');

var paths = {
  sass: './sass/*.scss'
};

gulp.task('sass', function () {
    return gulp.src('./sass/main.scss')
      .pipe(sass({style: 'expanded', unixNewlines: true}))
      .on('error', function (err) { console.log(err.message); })
      .pipe(gulp.dest('./public/css/'));
});


gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass'], function() {
  // place code for your default task here
});
