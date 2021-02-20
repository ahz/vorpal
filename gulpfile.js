const gulp = require('gulp');
const _gulp = require('load-plugins')('gulp-*');

const paths = {};
paths.src = './lib/**/*.js';
paths.dist = './dist';

gulp.task('lint', () => {
  return gulp.src(paths.src)
    .pipe(_gulp.xo());
});
