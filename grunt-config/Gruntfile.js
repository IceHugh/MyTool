//包装函数
module.exports = function(grunt){
    //任务配置，所有插件的配置信息
    grunt.initConfig({
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        //uglify插件的配置信息
        uglify: {
            options: {
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=pkg.author%>-<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {    //任务三：按原文件结构压缩js文件夹内所有JS文件
                expand: true,
                src: 'src/test.js',
                ext:'.js',
                dest: 'build/<%=pkg.name%>-<%=pkg.version%>.min.js'
            },
            /* builda:{//任务一：压缩test.js，不混淆变量名，保留注释，添加banner和footer
             options:{
             mangle:false,   //不混淆变量名
             preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
             footer:'\n*//*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> *//*'//添加footer
             },
             files:{
             'build/test.js':['src/test.js']
             }
             },
             */
           /*,
             release: {//任务四：合并压缩a.js和b.js
             files: {
             'build/test.min.js': ['src/test.js', 'src/test1.js']
             }
             }*/
        },
        jshint: {
            build: [ 'Gruntfile.js','src/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        //css压缩插件
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/less',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        //less插件配置
        less: {
            main: {
                expand: true,
                src: ['less/*.less'],
                dest: 'dist',
                ext: '.css'
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress:false
                }
            }
        },
        watch: {
            build: {
                files: ['src/*.js','src/*.css'],
                tasks: ['jshint'],
                options: { spawn: false}
            }
        },
        clean: {
            build: {
                src: ['src/*.js']
            }
        },
        concat: {
            options: {
                separator: ';',  //文件连接分隔符，表示连接的文件用指定的separator分割。
                stripBanners: true, //去除代码中的块注释
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=pkg.author%>-<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['a.js'],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
            }
        }
    });
    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // this would be run by typing "grunt test" on the command line
    // grunt.registerTask('test', ['jshint', 'qunit']);
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'uglify','watch']);
};