'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    svgstore:'grunt-svgstore',
    sprite: 'grunt-spritesmith'
  });


  // Define the configuration for all the tasks
  grunt.initConfig({
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: [
          'app/{elements,components,templates,pages,assets}/**/*.js'
        ],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['assets/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      compass: {
        files: [
          'app/styles/{,*/}*.{scss,sass}',
          'app/{elements,components,templates,pages}/**/*.scss'
        ],
        tasks: ['compass:server', 'postcss:server', 'copy']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/{elements,components,templates,pages,assets}/**/*.{html,js,scss,json}',
          'app/*.html',
          '.tmp/styles/{,*/}*.css',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'app/fonts/{,*/}*.{otf,woff,woff2,eot,ttf,svg}',
        ]
      },
      svgIcons: {
        files: ['app/styles/images/icons/*.svg'],
        tasks: ['svgstore']
      },
      sprite: {
        files: ['app/styles/images/icons/*.png'],
        tasks: ['sprite']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to 'localhost' to restrict access from outside.
        hostname: 'localhost',
        livereload: 34729
      },
      livereload: {
        options: {
          open: true,
          base: 'dist',
          middleware: function (connect) {
            return [
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static('app'),
              connect.static('dist')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('test'),
              connect.static('app')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/app.js',
          'app/{elements,components,templates,pages,assets}/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/app.js',
          'app/{elements,components,templates,pages,assets}/**/*.js'
        ]
      },
      test: {
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/{,*/}*',
            '!dist/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: 'app/images',
        fontsDir: 'app/styles/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: 'dist/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          'dist/app.js',
          'dist/{elements,components,templates,pages,assets}/**/*.js',
          'dist/styles/{,*/}*.css',
          'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'dist/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['dist/**/*.html'],
      css: ['dist/styles/{,*/}*.css'],
      js: ['dist/app.js', 'dist/**/*.js'],
      options: {
        assetsDirs: [
          'dist',
          'dist/images',
          'dist/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },
    svgstore: {
      options: {
        prefix: 'shape-',
        cleanup: false,
        svg: {
          style: 'display: none;'
        }
      },
      default: {
        files: {
          'app/styles/images/svg/svg-defs.svg': ['app/styles/images/icons/*.svg']
        }
      }
    },
    sprite: {
      all: {
        src: 'app/styles/images/icons/*.png',
        dest: 'app/components/spritesheet.png',
        destCss: 'app/styles/sprites/_sprites.scss'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles/images/**/*',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: 'dist/styles/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.svg',
          dest: 'dist/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.html'],
          dest: 'dist'
        }]
      }
    },
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: '.tmp', src: ['styles/**'], dest: 'dist/'},
          {expand: true, cwd: 'app', src: ['styles/**'], dest: 'dist/'},
          {expand: true, cwd: 'app', src: ['*.html', 'components/**'], dest: 'dist/'},
          {expand: true, cwd: 'app/styles', src: ['images/**', 'fonts/**'], dest: 'dist/styles'},
          {expand: true, cwd: 'app/assets', src: ['**'], dest: 'dist/js'}
        ]
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'postcss:server',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'postcss',
    'connect:test'
  ]);


  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'filerev',
    'usemin',
    'htmlmin',
    'imagemin',
    'svgstore',
    'sprite',
    'copy'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ]);
};
