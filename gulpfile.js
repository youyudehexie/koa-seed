var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

var paths = {
  sass: './sass/*'
};

//gulp.task('watch', function () {
    //gulp.watch(paths.sass, [''])
//});

gulp.task('sass', function () {
    return gulp.src('./sass/test.scss')
      .pipe(sass())
      .on('error', function (err) { console.log(err.message); })
      .pipe(gulp.dest('./public/css/dist'));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass'], function() {
  // place code for your default task here
});
