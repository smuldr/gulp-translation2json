# gulp-translation2json

Gulp plugin to convert CSV translation files to JSON using the [csv](https://www.npmjs.com/package/csv) package.

## Installation

Install with [npm](https://npmjs.org/package/gulp-translation2json):

```
npm install --save-dev gulp-translation2json
```

## Usage

```js
var gulp = require('gulp');
var translation2json = require('gulp-translation2json');

gulp.task('translate', function () {
  gulp.src('translations/**/*.csv')
    .pipe(translation2json())
    .pipe(gulp.dest('dist'));
});
```

## Options

The plugin passes all options on to the csv parser. For a full list of options see the [csv docs](http://csv.adaltas.com/parse/).

Extra options for the translation2json plugin:

- `keysColumn`

    Set the column index for the translation keys. Default value: `0`.

- `valuesColumn`

    Set the column index for the translation values. Default value: `1`.

- `indent`

    Set the indentation used for pretty printing. Set to `null` for no pretty printing. Default: (2 spaces).

## Thanks to

[gulp-csv2json](https://github.com/chilijung/gulp-csv2json)

## Contibutors

- [@timonsn](https://github.com/timonsn)

## License

MIT [@smuldr](https://github.com/smuldr)
