module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    
    //Jade to HTML Task
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: {
          'index.pretty.html':'src/jade/index.jade'
        },
      },

      fin: {
        files: {
          'final_build/index.pretty.html':'src/jade/index.jade'
        }
      },
    },

    // minify html file
    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html':'index.pretty.html'
        },
      },

      fin: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html':'index.pretty.html'
        },
      }
    },

    // Sass Task
    sass: {
      dev: {
        files: {
          'app/css/style.unprefix.css':'src/scss/style.scss'
        },
      },
    },

    // Prefixer with Myth.io
    myth: {
      dev: {
        files: {
          'app/css/style.prefix.css':'css/style.unprefix.css'
        },
      },
    },

    // Add rem fallback
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

    recess: {
      fin: {
        options: {
          compile: true
        },
        files: {
          'app/css/style.css': ['app/css/style.css']
        }
      }
    },

    // Watch Task
    watch:{
      css: {
        files: [
          'src/scss/{,*/}*.scss',
        ],
        tasks: [
          'sass','myth','pixrem','recess:fin'
        ],
      },

      page: {
        files: [
          'src/jade/{,*/}*.{jade,html}',
        ],
        tasks: [
          'jade:dev','htmlmin:dev'
        ]
      }

    },


    // Browser Sync 
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
            '{,*/}*.html',
            'css/style.prefix.css',
            'css/*.css',
            'js/{,*/}*.js',
            'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    }

  });


  grunt.registerTask('default',[
      //'jade:dev',
      //'htmlmin:dev',
      'sass:dev',
      'myth:dev',
      'pixrem',
      'recess:fin',
      //'browser_sync',
      'watch'

    ]);


};