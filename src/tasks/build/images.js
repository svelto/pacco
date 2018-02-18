
/* REQUIRE */

const gulp = require ( 'gulp' ),
      bytediff = require ( 'gulp-bytediff' ),
      flatten = require ( 'gulp-flatten' ),
      gulpif = require ( 'gulp-if' ),
      imagemin = require ( 'gulp-imagemin' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gulp' ),
      input = require ( '../../utilities/paths/input' ),
      log = require ( '../../utilities/log' ),
      output = require ( '../../utilities/paths/output' ),
      filter = require ( '../../plugins/filter' ),
      override = require ( '../../plugins/override' ),
      plugins = require ( '../../project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'override', 'imagemin' );

  return gulp.src ( input.getPath ( 'images' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'images' ) ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, imagemin ( plugins.imagemin.plugins, plugins.imagemin.options ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.stop () ) )
             .pipe ( gulp.dest ( output.getDir ( 'images' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-images', 'Build images', 'more' );
