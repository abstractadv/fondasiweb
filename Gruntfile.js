module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      dev: {
        files: {
          'app/css/style.unprefix.css':'src/scss/style.scss'
        },
      },
    },

    myth: {
      dev: {
        files: {
          'app/css/style.prefix.css':'app/css/style.unprefix.css'
        },
      },
    },

    pixrem: {
      options: {
        rootvalue: '16px',
        //replace: true
      },
      dist: {
        src: 'app/css/style.prefix.css',
        dest: 'app/css/style.css'
      }
    },

    watch:{
      css: {
        files: [
          'src/scss/{,*/}*.scss',
        ],
        tasks: [
          'sass','myth','pixrem'
        ],
      },
    },



    browser_sync: {
      dev: {
        options: {
          //host: '192.168.1.101',
          //port: 3000,
          watchTask: true,
          //ghostMode: {
           //scroll: true,
            //links: true,
            //forms: true
          //},
          injectChanges: false,
          server: {baseDir: "app"}

        },

        bsFiles: {
          src: [
            'app/{,*/}*.html',
            'app/css/style.prefix.css',
            'app/css/*.css',
            'app/js/{,*/}*.js',
            'app/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    }

  });


  grunt.registerTask('default',[
      'sass:dev',
      'myth:dev',
      'pixrem',
      //'browser_sync',
      'watch'

    ]);


};