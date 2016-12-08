var gulp = require('gulp');

var react = require('gulp-react');

gulp.task('compile-jsx', function() {
	gulp.src(['/jsx/**/*.jsx'])
		.pipe(react())
        .pipe(gulp.dest('/js'));
});

gulp.task('default', function() {

	gulp.watch(['/jsx/**/*.jsx'], ['compile-jsx']);
});