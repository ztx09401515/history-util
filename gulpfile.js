const gulp = require('gulp');
const babel = require('@babel/core');
const util = require('util');
const TextDecoder = util.TextDecoder;
const through = require('through2');
const Buffer = require('buffer').Buffer;
const TextEncoder = util.TextEncoder;
const watch=require('gulp-watch')
const childProcess=require('child_process');
function transform(arraybuffer, babelOptions) {
    var dec = new TextDecoder();
    var tx = dec.decode(arraybuffer);
    var re = babel.transform(tx, babelOptions);
    var enc=new TextEncoder();
   var code=enc.encode(re.code);
    var buf = Buffer.from(code);
    return buf;
}

const replaceTojs=function (name) {
    var exPat=/\.[^\\]+?$/;
    var nname=name.replace(exPat,'.js')
    return nname;
}
const options={presets: ['@babel/preset-env'],
    plugins:['babel-plugin-syntax-object-rest-spread','@babel/plugin-transform-typescript','babel-plugin-transform-react-jsx','@babel/plugin-proposal-class-properties'],
}

var ts=function () {
    gulp.src('src/**/*.ts', {
        buffer: true
    }).pipe(through.obj(function (chunk, enc, next) {
        var buf = transform(chunk.contents,options)
        chunk.contents = buf;
        this.push(chunk)
        next();
    }))
        .pipe(gulp.dest(function (file) {
            var namepat=/\\([^\\]+?)$/;
            var name=namepat.exec(file.history[0])[1];
            var nname=replaceTojs(name);
            var npath=file.history[0].replace(/\\[^\\]+$/,'\\'+nname)
            file.history.push(npath);
            var cwdstring=file.cwd+'\\src';
            var relative=file.history[1].replace(cwdstring,'');
            relative=relative.replace(/\\[^\\]+$/,'');
            return file.cwd+'\\lib'+relative;

        }))
}
gulp.task('babel-ts', ts);
