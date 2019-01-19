'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import nodemon from 'nodemon'
import standard from 'gulp-standard'
import watch from 'gulp-watch'

const serverPath = 'app'
const dist = 'dist/app'

function onServerLog (log) {
  console.log('nodemon: ' + log.message)
}

gulp.task('standard', function () {
  return gulp.src('app/**/*.js')
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: false
    }))
})

gulp.task('build', () =>
  gulp.src('app/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'))
)

gulp.task('start:dev', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  watch('app/**/*.js', gulp.series('standard'))
  nodemon(`-w ${serverPath} ${serverPath}`)
    .on('log', onServerLog)
})

gulp.task('start:prod', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  nodemon(`-w ${dist} ${dist}`)
    .on('log', onServerLog)
})

gulp.task('start', gulp.series('standard', 'start:dev'))
gulp.task('start:dist', gulp.series('standard', 'build', 'start:prod'))
