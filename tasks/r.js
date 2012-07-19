module.exports = function(grunt) {
  var exec = require('child_process').execFile,
      path = require('path');

  grunt.registerTask('r', 'RequireJS Optimizer', function() {
    var done = this.async();
    grunt.log.writeln('optimizing...');
    exec('node_modules/.bin/r.js', ['-o', grunt.config('r.build_profile')], function(error, stdout, stderr) {
      if (error) {
        grunt.log.error(error);
      }
      if (stderr) {
        grunt.log.error(stderr);
      }
      if (stdout) {
        grunt.log.write(stdout);
        grunt.config('r.built_scripts').forEach(function(script) {
          var distpath = path.join(grunt.config('r.built_dest'), path.basename(script));
          grunt.log.writeln('copy ' + script + ' to ' + distpath);
          grunt.file.copy(script, distpath);
        });
      }
      done();
    }); 
  });
};
