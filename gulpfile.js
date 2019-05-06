let gulp = require("gulp");
let browser = require("gulp-browserify");

gulp.task('compile-js', function(){
    return gulp.src('scripts/*.js')
        .pipe(browser)
        .pipe("bleep.js")
})

gulp.task('watch-js', function() {
    gulp.watch('scripts/*.js', ['compile-js'])
})

gulp.task('default', ['compile-js', 'watch-js']);