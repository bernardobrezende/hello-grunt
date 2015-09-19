'use strict';

module.exports = function(grunt) {
  
  // 1 - Configuração dos plugins
  grunt.initConfig({
    jshint: {
      options: {
        maxparams: 5,
        eqeqeq: true,
        undef: true
      },
      files: [ 'src/**/*.js' ]
    },
    clean: [ '.tmp', 'dist' ],
    copy: {
      html: {
        files: [
          { src: 'index.html', dest: 'dist/' }
        ]
      }
    },
    useminPrepare: {
      html: [ 'index.html' ],
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    filerev: {
      images: {
        src: [ 'dist/img/**/*.{png,jpg,gif}' ],
      },
      styles: {
        src: [ 'dist/**/*.css' ]
      },
      scripts: {
        src: [ 'dist/**/*.js' ]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '**/*.{png,jpg,gif}',
          dest: 'dist/img/'
        }]
      }
    },
    compress: {
      build: {
        options: {
          archive: function() {
            return new Date().getTime() + '-build-package.zip';
          },
          mode: 'zip'
        },
        files: [
          { src: 'dist/**', flatten: true }
        ]
      }
    }
  });

  // 2 - Carregamento dos plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', [
    'clean',
    'copy:html',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'imagemin',
    'filerev',
    'usemin',
    'compress'
  ]);
};