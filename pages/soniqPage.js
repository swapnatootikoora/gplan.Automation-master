var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

  this.checkTotalValue = function(maxTotal) {
    return browser.getText('.summary-grid tbody tr:last-child td.value-cell .cell-value', function (orderValue) {
      orderValue = parseFloat(orderValue.value.substring(1), 10);

      browser.verify.equal(true, maxTotal > orderValue, 'Option value ['+ orderValue +'] is less than budget [' + maxTotal + ']');
    });
  };

  this.saveAirtimeSp =  function(){
    return browser
      .click('#buttonSaveSP')
      .waitForElementNotPresent('#buttonSaveSP .loading')
      .saveScreenshot(generateScreenShotFilePath('Saved Soniq page'));
  }

  this.saveAndContinueSp = function() {
    return browser
      .waitForElementVisible('#buttonSaveAndContinueSP')
      .click('#buttonSaveAndContinueSP')
      .pause(2000)
    	.saveScreenshot(generateScreenShotFilePath('Soniq Plan Page'));
  }

  this.checkOpeProgress = function() {
    return browser
      .waitForElementVisible('.long-running-process', 100000)
      //.waitForElementNotVisible('.long-running-process', 200000, true, captureOpeStatus)
      .waitForElementNotPresent('.long-running-process', 200000, true, captureOpeStatus)
      .waitForElementVisible('.plan-page')
  }

  function captureOpeStatus() {
    browser.saveScreenshot(generateScreenShotFilePath('OPE Status'));
  }
  
  this.selectTargetAudiences = function(data) { 
    browser
      //.click('#targetDemographicSelect')
      .selectOption('#targetDemographicSelect', data.target)

    return browser;
  }

  this.updateTargetAudiences = function(data) {
    
    browser
      //.click('#targetDemographicSelect')
      .click('#breadCrumbs li:nth-child(3) a.breadcrumb-title-container')
      .waitForElementPresent('#spairtimeOptionDates .date-range-field-start .date')
      .selectOption('#targetDemographicSelect', data.target01)

    return browser;
  }

  this.addDefaultProductsAndSpotlength = function() {
    return browser
      .click('#add_new_spotlength')
      .waitForElementVisible('#list_spotlengths > li')
      .saveScreenshot(generateScreenShotFilePath('Soniq products & spot length details'))
  }

  this.calculateAndSelectStartDate = function(data) {

    if(data.term==='days'){
      var count = data.count;
      var term = data.term;
    }

    if(data.term==='weeks'){
      var count = (data.count * 7);
      var term = 'days';
    }
    browser.waitForElementVisible('.sp-ato-details .date-range-field-start .date')
    browser.getValue('.sp-ato-details .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var newStartDate = moment(startDateText, 'DD/MM/YY').add(count,term);
      var newStartDateText = newStartDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('.sp-ato-details .date-range-field-start .date', newStartDateText)
        .saveScreenshot(generateScreenShotFilePath('Start date selected'))
    });

    return browser;
  }

  this.calculateAndSelectEndDate = function(data) {

    if(data.term==='days'){
      var count = data.count -1;
      var term = data.term;
    }

    if(data.term==='weeks'){
      var count = (data.count * 7) -1;
      var term = 'days';
    }
    browser.waitForElementVisible('.sp-ato-details .date-range-field-end .date')
    browser.getValue('.sp-ato-details .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var endDate = moment(startDateText, 'DD/MM/YY').add(count,term);
      var endDateText = endDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('.sp-ato-details .date-range-field-end .date', endDateText)
        .saveScreenshot(generateScreenShotFilePath('Start and End date selected'))
    });

    return browser;
  }

  this.configureBudget = function(data) {
    return browser
      .clearValue('#budget')
      .setValue('#budget', data)
  };

  this.configureUpsell = function(data) {
    return browser
      .clearValue('#upsell')
      .setValueWithChangeEvent('#upsell', data)
      .saveScreenshot(generateScreenShotFilePath('Upsell configured'));
  };

 /* this.selectOptimisationMethod = function(data) {
    browser
    .waitForElementVisible('.sp-ato-discounts .select-container select')
    .selectOption('.sp-ato-discounts .select-container select', data)
    .pause(2000)
  return browser;
  }; */
  
  this.selectOptimisationMethod = function(data) {
    browser
    .waitForElementVisible('.budget-upsell-container .select-container select')
    .useXpath()
    .click('//*[@id="objectiveFunction"]/option[2]')
    //*[@id="objectiveFunction"]/option[2]
    .pause(1000)
    .useCss()
    return browser;
  };

  this.closeRepricingDialog = function() {
      return browser
        .waitForElementVisible('.footer-flyout-repricing-warning')
        .click('.footer-flyout-repricing-warning .cancel-action')
        .waitForElementNotVisible('.footer-flyout-repricing-warning')
  }
};