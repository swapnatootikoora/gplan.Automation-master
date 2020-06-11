var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.goToLogin = function(url) {

    browser
      .deleteCookies(function() {
        browser
          //.windowSize('current', 1440, 900)
          .windowMaximize('current')
          .url(url);

        if (url === "http://localhost:81") {
          browser.waitForElementVisible('input[name=UserName]');
        } else {
          browser.waitForElementVisible('input[name$=UserName]');
        }
      });

    return browser;
  };

  this.login = function(url, username, password) {

    if (url === "http://localhost:81") {
      return loginLocalhost(username, password);
    }

    return loginCloud(username, password);
  };

  function loginLocalhost(username, password) {

    return browser
      .pause(500)
      .clearValue('#userNameInput')
      .clearValue('#passwordInput')
      .setValue('input[name=UserName]', username)
      .setValue('input[name=Password]', password)
      .saveScreenshot(generateScreenShotFilePath('Login'))
      .click("#submitButton")
      .waitForElementVisible('#button_create_new_order', 15000)
      .saveScreenshot(generateScreenShotFilePath('Orders Page'));
  }

  function loginCloud(username, password) {

    return browser
      .pause(500)
      .clearValue('#userNameInput')
      .clearValue('#passwordInput')
      .setValue('input[name$=UserName]', username)
      .setValue('input[name$=Password]', password)
      .saveScreenshot(generateScreenShotFilePath('Login.png'))
      .click("#submitButton")
      .waitForElementVisible('#button_create_new_order', 15000)
      .saveScreenshot(generateScreenShotFilePath('Orders Page'));
  }
};