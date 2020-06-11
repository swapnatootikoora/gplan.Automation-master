var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.goToRevenueSummary = function() {
    browser
      .click('.nav-menu-show')
      .waitForElementVisible('#breadCrumbs li:first-child .spa-nav-popup-breadcrumbs')
      .click('#breadCrumbs li:first-child .spa-nav-popup-breadcrumbs li:last-child a')
      .waitForElementVisible('#territorySelect')
      .saveScreenshot(generateScreenShotFilePath('Revenue Summary Page'))

    return browser;
  };

  this.selectASalesTeam = function() {
  	return browser
      .waitForElementVisible('#territorySelect')
      .selectOption('#territorySelect', 'Chelmsford & Southend')
      .waitForElementVisible('#territorySelect option:not([value=""])')
  	  .click('#filter-button')
  	  .waitForElementVisible('.summary-grid .root-row:first-child .navigation-cell:nth-child(3) a')
      .saveScreenshot('Revenue Summary Page 2')

    return browser;
  }

  this.openFirstMonthTotalList = function() {
  	return browser
  		.click('.summary-grid .root-row:first-child .navigation-cell:nth-child(3) a')
  		.waitForElementVisible('.spa-revenues-list')
  		.saveScreenshot(generateScreenShotFilePath('Revenue List Page'))
  }

  this.filter = function(salesTeam, salesExec) {
    return browser
      .selectOption('#territorySelect', salesTeam)
      .selectOption('#salesExecSelect', salesExec)
      .click('#filter-button')
      .waitForElementVisible('.summary-grid .root-row:first-child .navigation-cell:nth-child(3) a');
  }
};