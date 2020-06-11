var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.changeProduct = function(productName) {

    return browser
      .waitForElementPresent('#spotLengthList')
      .waitForElementVisible('#spotLengthList')
      .pause(1000)
      //.click('#spotLengthList optgroup[label="' + productName + '"] option:first-child')
      .selectOption('#spotLengthList', productName)
      .waitForElementNotVisible('#filterDemographicSpinner .loader-container')
      .pause(1000)
    	.saveScreenshot(generateScreenShotFilePath('Analyse page filtering'));
  };

  this.getOrderNumber = function(cb) {

    browser
    .pause(3000)
    .getText('.spa-nav-proposal-info span.spa-nav-proposal-text:first-child', function (textResponse) {
      if (!textResponse.value) { return ''; }
      var orderNumber = new RegExp(/\d+/g).exec(textResponse.value)[0];
      console.log(orderNumber);
      cb(orderNumber);
    });

    return browser;
  }

    this.verifyTargetRevenue = function(data) {
    browser.getText('#totalRevenue', function(result) {
      browser.verify.equal(Number((result.value).replace(/[^0-9\.]+/g,"")), data.targetRevenue, 'Target Revenue is as expected');
    });

    return browser;
  }
  this.verifyAnalyseFeaturesAvailable = function() {
    browser  
      .verify.elementPresent('#buttonPlanalytics')
      .pause(500)
      .verify.elementPresent('#buttonGeneratePDF')
      .pause(500)
      .verify.elementPresent('#buttonExportToExcel')
      .pause(500);    
   
   return browser;
    }
}