var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

	this.addDefaultSpotLength = function() {
		return browser
          .click('#add_new_spotlength')
          .waitForElementVisible('#list_spotlengths > li')
          .saveScreenshot(generateScreenShotFilePath('BT40 option details'))
	}

	this.saveAndContinueBT40 = function() {
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
    browser.waitForElementVisible('.big-top-forty .date-range-field-end .date')
    browser.getValue('.big-top-forty .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var endDate = moment(startDateText, 'DD/MM/YY').add(count,term);
      var endDateText = endDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('.big-top-forty .date-range-field-end .date', endDateText)
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
    browser.waitForElementVisible('.big-top-forty .date-range-field-start .date')
    browser.getValue('.big-top-forty .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var newStartDate = moment(startDateText, 'DD/MM/YY').add(count,term);
      var newStartDateText = newStartDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('.big-top-forty .date-range-field-start .date', newStartDateText)
        .saveScreenshot(generateScreenShotFilePath('Start date selected'))
    });

    return browser;
  }
};