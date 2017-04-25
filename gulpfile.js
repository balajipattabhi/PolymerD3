var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var minify = require('gulp-minify');

gulp.task('vulcanize', function() {
  return gulp.src(['BarChart/*.html', 'BubbleChart/*.html', 'DonutChart/*.html','GroupedBar/*.html',
  'LiquidGauge/*.html','PieChart/*.html','ScatterPlot/*.html','StackedAreaChart/*.html','TimeSeries/*.html'])
  .pipe(vulcanize({
    stripComments: true,
    inlineScripts: true,
    inlineCss: true
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['vulcanize']);
