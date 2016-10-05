module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var path = require('path');
    var mountFolder = function (connect, dir) {
        return connect.static(path.resolve(dir));
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['app/**/*.js', 'test/**/*.js', '!app/js/lib/**/*', '!test/lib/**/*'],
            options: {
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        karma: {
            unit: {
                configFile: "karma.conf.js",
                singleRun: true
            }
        },
        clean: {
            dist: {
                files: [{
                    src: ["dist"],
                    dot: true
                    }]
            },
            tmp: {
                files: [{
                    src: [".tmp"],
                    dot: true
                    }]
            }
        },
        html2js: {
            options: {
                base: '.',
                module: false,
                singleModule: false,
                target: 'js'
            },
            main: {
                expand: 'true',
                src: ['app/templates/**/*.html'],
                ext: '.html.js'
            }
        },
        copy: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**/*', '!css/**/*', '!js/**/*'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        useminPrepare: {
            html: ["app/index.html"],
            options: {
                dest: "dist/"
            }
        },
        usemin: {
            html: ["dist/*.html"],
            css: ["dist/css/{,*/}*.css"],
            options: {
                basedir: "dist/",
                dirs: ["dist/"]
            }
        },
        connect: {
            options: {
                port: 9000,
                protocol: 'http',
                hostname: 'localhost',
                base: 'dist',
                open: 'http://localhost:9000/'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: ["*.*", "app/**/*", "!.tmp"],
                tasks: [
                        'jshint',
                        'html2js',
                        'test',
                        'clean:dist',
                        'copy',
                        'useminPrepare',
                        'concat:generated',
                        'cssmin:generated',
                        'uglify:generated',
                        'usemin'
                        ],
                options: {
                    livereload: true
                }
            },
        }
    });

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', [
                                'jshint',
                                'html2js',
                                'test',
                                'clean:dist',
                                'copy',
                                'useminPrepare',
                                'concat:generated',
                                'cssmin:generated',
                                'uglify:generated',
                                'usemin',
                                'clean:tmp'
                                ]);

    grunt.registerTask('develop', [
                                'jshint',
                                'html2js',
                                'test',
                                'clean:dist',
                                'copy',
                                'useminPrepare',
                                'concat:generated',
                                'cssmin:generated',
                                'uglify:generated',
                                'usemin',
                                'connect',
                                'watch'
                                ]);
    grunt.registerTask('default', ['develop']);

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    return grunt;
};