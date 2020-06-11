var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.navigateToOrder = function(productName) {
    return browser
      //.click('#breadCrumbs > li.order > a')
      .click('#breadCrumbs li:nth-child(2) a.breadcrumb-title-container')
      .pause(2000)
      .waitForElementPresent('#saveOrderButtonTop')
      .url(function(url){
        browser.url(url);
      })
      .waitForElementVisible('#saveOrderButtonTop')
  }

  this.navigateToAirtimeOptions = function(productName) {
  	return browser
  		.click('#breadCrumbs li:nth-child(3) a.breadcrumb-title-container')
		  .waitForElementPresent('#spairtimeOptionDates .date-range-field-start .date')
  }

  this.navigateToOption = function(){
    return browser
      .waitForElementPresent('#breadCrumbs li:nth-child(3) a.breadcrumb-title-container')
      .click('#breadCrumbs li:nth-child(3) a.breadcrumb-title-container')
  }

  this.getOrderNumber = function(cb) {

    browser.getText('.spa-nav-proposal-info span.spa-nav-proposal-text:first-child', function (textResponse) {

      if (!textResponse.value) { return ''; }

      var orderNumber = new RegExp(/\d+/g).exec(textResponse.value)[0]
      cb(orderNumber);
    });

    return browser;
  }  

};