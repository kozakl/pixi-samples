var gulp        = require('gulp'),
    streamqueue = require('streamqueue'),
    concat      = require('gulp-concat'),
    through     = require('through2');
    exec        = require('child_process').exec;

gulp.task('build', function() {
    const files = [
        './lib/Pixi.js',
        './src/utils/DetectDevice.js',
        './src/utils/MathUtil.js',
        './src/utils/TextureUtil.js',
        './src/Main.js'
    ];
    
    streamqueue({objectMode:true},
            gulp.src(files.concat('!./src/**')),
            gulp.src(files.concat('!./lib/*'))
                .pipe(concat('source.js'))
                .pipe(through.obj(removeStats))
                .pipe(through.obj(addWrapper))
        )
        .pipe(concat('source.js'))
        .pipe(gulp.dest('./'));
    
    
    var command = 'java -jar tools/compiler.jar';
    command += ' --language_in ECMASCRIPT5_STRICT';
    command += ' --compilation_level ADVANCED_OPTIMIZATIONS';
    //command += ' --debug true';
    //command += ' --formatting PRETTY_PRINT';
    command += ' --externs tools/extern.js';
    command += ' --js source.js';
    command += ' --js_output_file source.min.js';
    
    exec(command,
        function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        }
    );
});

function removeStats(file, enc, cb)
{
    enc = null;
    if (file.contents)
        file.contents = new Buffer(file.contents.toString().replace(/^.*stats.*$/mg, ''));
    
    this.push(file);
    return cb();
}

function addWrapper(file, enc, cb)
{
    enc = null;
    if (file.contents)
        file.contents = new Buffer('(function(){{0}})();'.replace('{0}', file.contents.toString()));
    
    this.push(file);
    return cb();
}
