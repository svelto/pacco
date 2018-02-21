
/* REQUIRE */

const _ = require ( 'lodash' ),
     argv = require ( 'yargs' ).argv,
     path = require ( 'path' ),
     cssnano = require ( 'cssnano' ),
     imagemin = require ( 'gulp-imagemin' ),
     file = require ( '../../utilities/file' );

/* PLUGINS */

const plugins = {
  autoprefixer: {
    enabled: true,
    options: {
      browsers: ['ie >= 10', 'ie_mob >= 10', 'edge >= 13', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'],
      cascade: true,
    }
  },
  babel: {
    enabled: true,
    options: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['ie >= 10', 'ie_mob >= 10', 'edge >= 13', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10']
          },
          loose: true,
          modules: 'commonjs',
          uglify: true //TODO: Test true/false values when compiling Svelto
        }]
      ],
      plugins: [require.resolve ( '../../plugins/lodash_template_compile.js' )], //FIXME: Ugly, `require.resolve` shouldn't be needed //FIXME: `lodash_template_compile` should be published on NPM
      babelrc: false,
      compact: false
    }
  },
  babili: {
    enabled: false,
    options: {}
  },
  closure: {
    enabled: false,
    options: {
      assumeFunctionWrapper: true,
      compilationLevel: 'SIMPLE',
      languageIn: 'ECMASCRIPT5_STRICT',
      languageOut: 'ECMASCRIPT5_STRICT',
      outputWrapper: '(function(){\n%output%\n}).call(this)',
      warningLevel: 'QUIET'
    }
  },
  del: {
    options: {
      force: true
    }
  },
  components: {
    enabled: true,
    options: {
      path2component: file.file2component,
      log: !!argv.verbose
    }
  },
  dependencies: {
    enabled: true,
    options: {
      path2component: file.file2component,
      log: !!argv.verbose
    }
  },
  htmlmin: {
    enabled: true,
    options: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }
  },
  imagemin: {
    enabled: true,
    plugins: [
      imagemin.gifsicle ({
        interlaced: true,
        optimizationLevel: 3
      }),
      imagemin.jpegtran ({
        progressive: true
      }),
      imagemin.optipng ({
        optimizationLevel: 7
      }),
      imagemin.svgo ({
        multipass: true,
        plugins: [{
          cleanupIDs: false,
        }, {
          removeViewBox: false
        }]
      })
    ],
    options: {}
  },
  jsonminify: {
    enabled: true,
    options: {}
  },
  markdown: {
    enabled: true,
    options: {
      breaks: true,
      xhtml: true
    }
  },
  postcss: {
    enabled: true,
    plugins: [
      cssnano ({
        autoprefixer: false,
        normalizeUrl: false,
        svgo: false,
        zindex: false
      })
    ],
    options: {}
  },
  sass: {
    enabled: true,
    options: {
      outputStyle: 'expanded',
      precision: 10
    }
  },
  substitute: {
    enabled: true,
    options: {
      tokenRe: /\[pacco(?:\.((?:[^\[\]\s]+|\[\d+\]){1,}))?\]/g,
      log: !!argv.verbose
    }
  },
  uglify: {
    enabled: true,
    options: {}
  }
};

/* EXPORT */

module.exports = plugins;
