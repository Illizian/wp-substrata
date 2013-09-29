module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        files: {
          'library/js/main.min.js': ['src/js/main.js']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    less: {
      build: {
        options: {
          yuicompress: true
        },
        files: {
          'library/css/style.min.css': [ 'src/less/style.less'],
          'library/css/login.min.css': [ 'src/less/login.less']
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/images', src: ['*.*'], dest: 'library/images/'},
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['src/less/*.less'],
        tasks: ['less']
      },
      js: {
        files: ['src/js/**/*.js', 'src/js/*.js'],
        tasks: ['jshint', 'uglify:build']
      }
    },
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', [ 'jshint', 'uglify:build', 'less:build', 'copy', 'watch' ]);
  grunt.registerTask('build', [ 'jshint', 'uglify:build', 'less:build', 'copy' ]);
};