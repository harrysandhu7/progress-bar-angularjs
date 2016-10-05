module.exports = function(config){
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath : '.',

    files : [
      // Helper files for test specs
      'test/lib/jquery-1.8.2.min.js',
      'test/lib/helper.js',

      // Library Files
      'app/js/lib/angular-1.5.8/angular.min.js',
      'app/js/lib/angular-1.5.8/angular-mocks.js',

      // Source & Spec files
      'app/js/*.js',
      'app/templates/**/*.html.js',
      'app/js/**/*.js',
      'test/**/*.spec.js'
    ],

    // list of files to exclude
    exclude : [],

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters : ['progress','coverage'],
    preprocessors : { 
      'app/**/!(test)/*.js': 'coverage'
    },
    coverageReporter : {
    	type : 'lcov',
    	dir : 'coverage/',
      subdir: '.'
    },

    // web server port
    port : 9877,

    // cli runner port
    runnerPort : 9000,

    // enable / disable colors in the output (reporters and logs)
    colors : true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel : 'LOG_INFO',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch : false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : [
    'Chrome'
    ],
    frameworks: ['jasmine'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout : 10000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : true
  });
};