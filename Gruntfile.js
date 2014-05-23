'use strict';

module.exports = function (grunt) {
  var path = require('path'),
      _ = grunt.util._;

  var paths = {
    app:        'app/scripts/*.js',
    test:       'test/*Spec.js',
    server:     'build/server.js'
  };

  grunt.initConfig({

    express: {
      dev : {
        options: {
          server: path.resolve(paths.server),
          port: 4000,
          debug: true,
          verbose: true
        }
      },
      test : {
        options: {
          server: path.resolve(paths.server),
          port: 4001
        }
      }
    },


    jasmine: {
      test: {
        src: [
          paths.app,
          '!app/scripts/init.js'
        ],
        options: {
          specs: paths.test,
          // Note that the `express:test` task must run first for
          // this host to resolve correctly, so this `jasmine:test`
          // task cannot be run on its own and the `test` task defined
          // below should always be used.
          host: 'http://localhost:<%= express.test.options.port %>',
          keepRunner: true,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'app/scripts/init.js'
          }
        }
      }
    },


    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      app: {
        src: [ paths.app ]
      },
      test : {
        src : [ paths.test ]
      }
    },


    watch: {
      options: {
        livereload: true
      },
      app: {
        files: [ paths.app, paths.test, 'app/*.html' ],
        tasks: [ 'test' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');


  // Development tasks
  grunt.registerTask('default',           [ 'express:dev', 'watch' ]);
  grunt.registerTask('test',              [ 'jshint:app', 'express:test', 'jasmine' ]);

};
