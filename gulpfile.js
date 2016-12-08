var gulp = require('gulp');
var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


gulp.task('compile', function(done) {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'tsc' : 'sh ./tsc.sh';

	exec(cmd, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
});

gulp.task('serve', function () {
	browserSync.init({
        notify: false,
        // Customize the BrowserSync console logging prefix
        // logPrefix: 'SERVE',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        startPath: 'index.html',
        server: {
            baseDir: './'
        }
    });

    gulp.watch(['./js/**/*.tsx', './js/**/*.ts', './index.html', './css/**/*.css'], ['compile', reload]);
});

gulp.task('default', ['serve']);