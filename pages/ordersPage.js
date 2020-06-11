var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

	this.goToOrdersPage = function (url) {
    browser
      .windowSize('current', 1440, 900)
      .url(url)
      .pause(5000)
      .waitForElementVisible('#button_create_new_order')
      
    return browser;
  	
  	};
  
  this.goToNewOrder = function() {
    browser
    .pause(1000)
	    .click('#button_create_new_order')
      .waitForElementVisible('#saveOrderButtonTop')
      .saveScreenshot(generateScreenShotFilePath('Order Page'));

    return browser;
  };

  this.goToRegionalRevenuesPage = function() {
    return browser
      .waitForElementVisible('.breadcrumb-title-container .nav-menu-show')
      .click('.breadcrumb-title-container .nav-menu-show')
      .pause(500)
      .waitForElementVisible('.spa-nav-popup-breadcrumbs ul li:last-child a')
      .click('.spa-nav-popup-breadcrumbs ul li:last-child a')
      .pause(500)
      .waitForElementVisible('.spa-revenue-summary-page')
  }

  this.searchOrderAndGoToOrder = function(orderNumber) {
    return browser
      .waitForElementVisible('.search-text-box')
      .clearValue('.search-text-box')
      .setValue('.search-text-box', [orderNumber, browser.Keys.ENTER])
      .waitForElementVisible('.orders-list .order-with-proposal:first-child')
      .click('.orders-list .order-with-proposal:first-child')
      .pause(1000)
      .waitForElementVisible('#saveOrderButtonTop')
      .saveScreenshot(generateScreenShotFilePath('Order Page'));
  }
};