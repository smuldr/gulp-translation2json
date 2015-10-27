'use strict';

var path = require('path');
var fs = require('graceful-fs');
var gutil = require('gulp-util');
var map = require('map-stream');
var tempWrite = require('temp-write');
var csv = require('csv');

module.exports = function (options) {
    return map(function (file, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new gutil.PluginError('gulp-translation2json', 'Streaming not supported'));
        }

        if (['.csv'].indexOf(path.extname(file.path)) === -1) {
            gutil.log('gulp-translation2json: Skipping unsupported csv ' + gutil.colors.blue(file.relative));
            return cb(null, file);
        }

        tempWrite(file.contents, path.extname(file.path), function (err, tempFile) {
            if (err) {
                return cb(new gutil.PluginError('gulp-translation2json', err));
            }

            fs.stat(tempFile, function (err, stats) {
                if (err) {
                    return cb(new gutil.PluginError('gulp-translation2json', err));
                }

                var record = {};
                options = options || {};

                csv()
                    .from.path(tempFile, {
                        delimiter: ',',
                        escape: '"'
                    })
                    .on('record', function (row) {
                        var keyIndex = options.keysColumn || 0;
                        var valueIndex = options.valuesColumn || 1;
                        record[row[keyIndex]] = row[valueIndex];
                    })
                    .on('end', function (count) {
                        // when writing to a file, use the 'close' event
                        // the 'end' event may fire before the file has been written
                        //
                        gutil.log('gulp-translation2json:', gutil.colors.green('✔ ') + file.relative, '(' + count + ' labels)');
                        file.contents = new Buffer(JSON.stringify(record));
                        file.path = gutil.replaceExtension(file.path, '.json');
                        cb(null, file);
                    })
                    .on('error', function (error) {
                        return cb(new gutil.PluginError('gulp-translation2json', error));
                    });
            });
        });
    });
};
