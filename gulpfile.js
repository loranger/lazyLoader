var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    gulp.src('lazyLoader.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src(['lazyLoader.js'])
        .pipe(rename('lazyLoader.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
});

gulp.task('default', function(){
    gulp.run('lint', 'scripts');
    
    // Watch files and run tasks if they change
    gulp.watch('./*.js', function(event) {
        gulp.run('scripts');
    });
});