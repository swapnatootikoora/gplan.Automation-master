var gulp = require('gulp'),
    del = require('del'),
    nightwatch = require('gulp-nightwatch'),
    jsonFile = require('jsonfile'),
    _ = require('lodash'),
    proxy;

///
/// Default task - do nothing
///
gulp.task('default', function(){
  console.log('\n\nPlease specify to run either \'sanity\' or \'smoke\' tests, e.g. \'node test sanity\'\n\n')
});
///
/// Run tests with the specified browser
///
//gulp.task('phantomjs', ['clean-screenshots', 'buildRuntimeSettings'], taskRunner.bind(this, 'phantomjs'));
//gulp.task('safari', ['clean-screenshots', 'buildRuntimeSettings'], taskRunner.bind(this, 'safari'));
//gulp.task('chrome', ['clean-screenshots', 'buildRuntimeSettings'], taskRunner.bind(this, 'chrome'));
gulp.task('sanity', ['clean-screenshots', 'buildRuntimeSettings'], taskRunner.bind(this, 'safari', 'sanity'));
gulp.task('smoke', ['clean-screenshots', 'buildRuntimeSettings'], taskRunner.bind(this, 'safari', 'smoke'));
gulp.task('chromesanity', ['clean-screenshots', 'buildRuntimeSettings'], taskRunner.bind(this, 'chrome', 'sanity'));
gulp.task('chromesmoke', ['clean-screenshots', 'buildRuntimeSettings'], taskRunner.bind(this, 'chrome', 'smoke'));

///
/// Delete all files and folders in the screenshots directory
///
gulp.task('clean-screenshots', cleanScreenshotsDirectory);

///
/// Build runtime settings
///
gulp.task('buildRuntimeSettings', buildRuntimeSettings);

///
/// Handles starting a task, fetching jcn and runing the tests for a particular browser
///
function taskRunner(browser, group) {
  runTests(browser, group);
}

///
/// Runs the tests for the specified browser with jcn
///
function runTests(browser, group) {

  var cliArgs = ['--env ' + browser];
  if (group) {
    cliArgs.push('--group ' + group);
  }

  var lastArgument = process.argv[process.argv.length - 1];
  if (lastArgument.substring(0,2) === "--") {
    cliArgs.push('--gplanEnv ' + lastArgument.substring(2));
  }

  return gulp.src('')
      .pipe(nightwatch({
        configFile: 'nightwatch-runtime.json',
        cliArgs: cliArgs
      }));
}

///
/// Delete all screenshots
///
function cleanScreenshotsDirectory(callback) {
  del([
      'screenshots/**/*'
    ],
    callback
    );
}

///
/// Read the local settings file and nightwatch json file and generate the
/// run time settings json file to be used
///
function buildRuntimeSettings(callback) {

  jsonFile.spaces = 4;
  jsonFile.readFile('nightwatch.json', function(err, defaultSettings) {

    if (err) {
      console.log('Error reading default nightwatch settings');
      return;
    }

    jsonFile.readFile('local-settings.json', function(err, localSettings) {

      var settings = defaultSettings;

      if (err) {
        console.log('Error reading local settings');
      } else {
        proxy = localSettings.proxy;

        if (localSettings.nightwatch && localSettings.nightwatch.test_settings) {
          _.extend(settings.test_settings, localSettings.nightwatch.test_settings);
        }
        console.log(proxy);
      }

      jsonFile.writeFile('nightwatch-runtime.json', settings, function(err) {

        if (err) {
          console.log('Error writing runtime settings');
          throw new Error('Test aborted, runtime settings not generated');
        }

        callback();
      });
    });
  });
}