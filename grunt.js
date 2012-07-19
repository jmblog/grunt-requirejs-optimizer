/*global module:false*/
module.exports = function(grunt) {
  
  var src_dir = 'YOUR_SOURCE_PATH';

  // Project configuration.
  grunt.initConfig({
    lint: {
      src: [src_dir + '/js/*.js', src_dir + '/js/app/**/*.js'],
      grunt: ['grunt.js'],
      test: [src_dir + '/test/*.js']
    },
    watch: {
      files: ['<config:lint.src>', '<config:lint.grunt>', '<config:lint.test>'],
      tasks: 'lint'
    },
    r: {
      build_profile: src_dir + '/js/build_profile',
      built_scripts: [src_dir + '/js/build/app.js', src_dir + '/js/build/mobile.js'],
      built_dest:    src_dir + '/js/built'
    },
    jshint: {
      // Defaults.
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {},
      // Just for the lint:grunt target.
      grunt: {
        options: { node: true },
        globals: {}
      },
      // Just for the lint:src target.
      src: {
        options: { browser: true },
        globals: {
          FB: true,
          $: true,
          require: true,
          define: true,
          module: true
        }
      },
      // Just for the lint:test target.
      test: {
        options: {},
        globals: {
          module: true, test: true,
          ok: true, equal: true, notEqual: true, expect: true, strictEqual: true, deepEqual: true, notDeepEqual: true, raises: true,
          QUnit: true, sinon: true
        }
      }
    },
    uglify: {}
  });
  
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint r');

};
