'use strict';

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var parse = require('csv-parse');

module.exports = function (options) {
    options = options || {};
    var keysColumn = options.keysColumn || 0;
    var valuesColumn = options.valuesColumn || 1;

    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(new gutil.PluginError('gulp-translation2json', 'Streaming not supported'));
        }

        if (['.csv'].indexOf(path.extname(file.path)) === -1) {
            gutil.log('gulp-translation2json', 'Skipping unsupported csv ' + gutil.colors.cyan(file.relative));
            return callback(null, file);
        }

        var output = {};
        var count = 0;
        var parser = parse(options);
        parser.on('readable', function () {
            var record;
            while (record = parser.read()) {
                output[record[keysColumn]] = record[valuesColumn];
                count++;
            }
        });
        parser.on('error', function (err) {
            return callback(new gutil.PluginError('gulp-translation2json', err));
        });
        parser.on('finish', function () {
            file.contents = new Buffer(JSON.stringify(output));
            file.path = gutil.replaceExtension(file.path, '.json');
            gutil.log('gulp-translation2json', gutil.colors.green('✔'), gutil.colors.cyan(file.relative),
                '(' + count + ' rows)');
            callback(null, file);
        });
        parser.write(file.contents);
        parser.end();
    });
};
