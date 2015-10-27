'use strict';
var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var translation2json = require('./index');

it('should convert csv to json', function (cb) {
    var stream = translation2json();
    stream.on('data', function (file) {
        var output = JSON.parse(file.contents.toString('utf-8'));
        assert(output instanceof Object);
        assert.equal(output['key1'], 'value1');
        assert.equal(output['key2'], 'value2');
        assert.equal(output['key3'], 'value3');
        cb();
    });
    stream.write(new gutil.File({
        path: __dirname + '/sample/sample-csv.csv',
        contents: fs.readFileSync(__dirname + '/sample/sample-csv.csv')
    }));
});

it('should use options to select the column csv to json', function (cb) {
    var stream = translation2json({
        keysColumn: 0,
        valuesColumn: 2
    });
    stream.on('data', function (file) {
        var output = JSON.parse(file.contents.toString('utf-8'));
        assert(output instanceof Object);
        assert.equal(output['key1'], 'some comments');
        assert.equal(output['key2'], 'more comments');
        assert.equal(output['key3'], 'what');
        cb();
    });
    stream.write(new gutil.File({
        path: __dirname + '/sample/sample-csv.csv',
        contents: fs.readFileSync(__dirname + '/sample/sample-csv.csv')
    }));
});
