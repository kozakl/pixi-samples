var gulp       = require('gulp'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    browserify = require('browserify');

gulp.task('buildPixi', function() {
    var entry = './lib/pixi/index';
    return browserify(entry, {standalone:'PIXI'})
        .require(entry, {expose:'pixi.js'})
        .bundle()
        .pipe(source('Pixi.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./lib'));
});
