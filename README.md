# gulp-translation2json
gulp plugin to convert CSV translation files to JSON

## Install
Install with [npm](https://npmjs.org/package/gulp-translation2json)

```
npm install --save-dev gulp-translation2json
```

## Example

```js
var gulp = require('gulp');
var translation2json = require('gulp-translation2json');

gulp.task('translate', function () {
  gulp.src('translations/**/*.csv')
    .pipe(translation2json())
    .pipe(gulp.dest('dist'));
});
```

## Thanks to
[gulp-csv2json](https://github.com/chilijung/gulp-csv2json)

## License
MIT [@smuldr](https://github.com/smuldr)
