
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      flatten = require ( 'gulp-flatten' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' )
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      output = require ( '../../utilities/paths/output' ),
      plumberU = require ( '../../utilities/plumber' ),
      project = require ( '../../project' ),
      {plugins} = project,
      components = require ( '../../plugins/components' ),
      dependencies = require ( '../../plugins/dependencies' ),
      touch = require ( '../../plugins/touch' );

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.plugin ( 'dependencies', 'markdown', 'htmlmin' ),
        needOutput = output.isEnabled ( 'markdown' );

  return gulp.src ( input.getPath ( 'markdown' ) )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate && needOutput, () => newer ( output.getDir ( 'markdown' ) ) ) )
             .pipe ( gulpif ( plugins.markdown.enabled, () => require ( 'gulp-markdown' )( plugins.markdown.options ) ) )
             .pipe ( gulpif ( plugins.htmlmin.enabled, () => require ( 'gulp-htmlmin' )( plugins.htmlmin.options ) ) )
             .pipe ( gulpif ( needOutput, () => gulp.dest ( output.getDir ( 'markdown' ) ) ) )
             .pipe ( gulpif ( needOutput, touch () ) );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-markdown', 'Build Markdown', 'more' );
