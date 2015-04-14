
module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('test', ['connect', 'qunit']);

  grunt.initConfig({
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8000/WebContent/test/index.qunit.html',
            'http://localhost:8000/WebContent/test/index.opa5.html'
          ]
        }
      }
    },
    connect: {
     server: {
       options: {
         port: 8000,
         base: '.'
       }
     }
    }
  });

  grunt.event.on('qunit.moduleStart', function (name)  {
    grunt.log.ok("Running module: " + name );
  });

  grunt.event.on('qunit.log', function ( result, actual, expected, message, source)  {
    grunt.log.ok("Test: " + [result, actual, expected, message, source].filter(Boolean).join() );
  });

  grunt.event.on('qunit.testDone', function ( name, failed, passed, total, duration )  {
    grunt.log.ok("Summary: " + [name, failed, passed, total, duration].filter(Boolean).join() );
  });

};




