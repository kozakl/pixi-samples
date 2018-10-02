const PATH_05x  = './Mats/Graphics/Atlas/Atlas@0.5x';
const PATH_075x = './Mats/Graphics/Atlas/Atlas@0.75x';
const PATH_1x   = './Mats/Graphics/Atlas/Atlas@1x';
const PATH_125x = './Mats/Graphics/Atlas/Atlas@1.25x';
const PATH_15x  = './Mats/Graphics/Atlas/Atlas@1.5x';
const PATH_175x = './Mats/Graphics/Atlas/Atlas@1.75x';

var gulp = require('gulp'),
    del  = require('del'),
    gm   = require('gulp-gm'),
    es   = require('event-stream'),
    exec = require('child_process').exec;

gulp.task('makeAtlas', function() {
    del.sync([PATH_05x,
              PATH_075x,
              PATH_1x,
              PATH_125x,
              PATH_15x]);
    
    es.concat(
        makeDir(PATH_05x,  0.5),
        makeDir(PATH_075x, 0.75),
        makeDir(PATH_1x,   1),
        makeDir(PATH_125x, 1.25),
        makeDir(PATH_15x,  1.5)
    ).on('end', function() {
        exec('TexturePacker ' + PATH_05x  + '.tps');
        exec('TexturePacker ' + PATH_075x + '.tps');
        exec('TexturePacker ' + PATH_1x   + '.tps');
        exec('TexturePacker ' + PATH_125x + '.tps');
        exec('TexturePacker ' + PATH_15x  + '.tps');
        exec('TexturePacker ' + PATH_175x + '.tps');
    });
});

function makeDir(path, factor)
{
    return gulp.src(PATH_175x + '/**/*.{png,jpg,jpeg}')
        .pipe(
            gm(function(gmfile, complete) {
                gmfile.size(function(err, size) {
                    complete(null, gmfile.resize(getScaleSize(size.width,  1.75, factor),
                                                 getScaleSize(size.height, 1.75, factor)));
                });
            })
        )
        .pipe(gulp.dest(path));
}

function getScaleSize(size, divisor, factor) { return Math.round(size / divisor * factor); }
