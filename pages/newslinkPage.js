var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

    
  this.addProduct = function(data) {
    browser
      .selectOption('#spotlengthsProductList',data.product)
      //.clearValue('#newSpotlength')
      //.setValue('#newSpotlength',data.spotlength)
      //.click('#add_new_spotlength')
      //.waitForElementVisible('#list_spotlengths > li')
      .saveScreenshot(generateScreenShotFilePath('Newslink option details'))

    return browser;
  }

	this.addDefaultSpotLength = function () {
		return browser
      .click('#add_new_spotlength')
      .waitForElementVisible('#list_spotlengths > li')
      .waitForElementVisible('#selectedBuyingAreas > li')
      .saveScreenshot(generateScreenShotFilePath('Newslink option details'))
  }

	this.saveAndContinueNewslink = function () {
		return browser
			.waitForElementVisible('#buttonSaveAndContinueSP')
      .click('#buttonSaveAndContinueSP')
      .waitForElementVisible('.plan-page')
	}

	this.calculateAndSelectEndDate = function(data) {

    if(data.term==='days'){
      var count = data.count -1;
    }

    if(data.term==='weeks'){
      var count = (data.count * 7) -1;
      var term = 'days'
    }
    browser.waitForElementVisible('#spairtimeOptionDates .date-range-field-end .date')
    browser.getValue('#spairtimeOptionDates .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var endDate = moment(startDateText, 'DD/MM/YY').add(count,term);
      var endDateText = endDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('#spairtimeOptionDates .date-range-field-end .date', endDateText)
        .saveScreenshot(generateScreenShotFilePath('Start and End date selected'))
    });

    return browser;
  }

  this.calculateAndSelectStartDate = function(data) {

    if(data.term==='days'){
      var count = data.count;
    }

    if(data.term==='weeks'){
      var count = (data.count * 7);
      var term = 'days'
    }
    browser.waitForElementVisible('#spairtimeOptionDates .date-range-field-start .date')
    browser.getValue('#spairtimeOptionDates .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var newStartDate = moment(startDateText, 'DD/MM/YY').add(count,term);
      var newStartDateText = newStartDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('#spairtimeOptionDates .date-range-field-start .date', newStartDateText)
        .saveScreenshot(generateScreenShotFilePath('Start date selected'))
    });

    return browser;
  }
  
};