
/* REQUIRE */

const gutil = require ( '../../../../utilities/gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'functions', false );

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss-functions', 'Build SCSS functions', 'all' );
