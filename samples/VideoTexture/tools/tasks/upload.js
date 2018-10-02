const SERVER = '/Users/Luke/Public/kozakluke.bitbucket.org/';

var del  = require('del'),
    gulp = require('gulp'),
    exec = require('child_process').exec,
    fs   = require('fs');

gulp.task('upload', () => {
    const files = {
        debug: [
            './assets/**/*',
            './lib/**/*',
            './src/**/*',
            './test.html'
        ],
        release: [
            './assets/**/*',
            './source.min.js',
            './index.html'
        ]
    };
    
    const project = JSON.parse(fs.readFileSync('./package.json')).description,
          release = process.argv.indexOf('--release') != -1;
    
    del.sync([SERVER + project], {force: true});
    
    gulp.src(release ? files.release : files.debug.concat(files.release), {base: '.'})
        .pipe(gulp.dest(SERVER + project))
        .on('end', () => {
            const process = exec(`cd ${SERVER} ; git add . ; git commit -m 'Update: ${project}.' ; git push origin`);
            process.stdout.on('data', console.log);
            process.stderr.on('data', console.log);
        });
});
