var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {


this.addSingleRajar = function() {
    return browser
      .waitForElementPresent('#pickBuyingAreasButton')
      //.waitForElementVisible('#pickBuyingAreasButton')
      .pause(1000)
      .click('#pickBuyingAreasButton')
      .pause(2000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .waitForElementVisible('.brands-and-groups-list > div:first-child .navigation-list')
      .pause(500)
      .click('#globalBrandsList > li:nth-child(1) span')
      .pause(1000)
      .waitForElementVisible('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .pause(500)
      .click('#baListForBrand li.select-item:first-child .select-item-check')
      .pause(1000)
      .waitForElementNotPresent('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .pause(500)
      .click('#buttonAddSelectedBas')
      .pause(1000)
      .waitForElementNotPresent('.buying-area-selection-dialog')
      .pause(500)
      .verify.elementPresent('.selected-buying-areas li')
      .saveScreenshot(generateScreenShotFilePath('package option buying areas'))
  }

  this.selectPackage = function(data) {
  	return browser
      .waitForElementPresent('#selectedPackage')
      .waitForElementVisible('#selectedPackage')
      .pause(1000)
      //.selectOption("#selectedPackage",data)
      .selectOption('.package-selection-division .select-container select', data)
 
  }

  this.enterPackageOptionName = function(data){
  	return browser
      .waitForElementVisible('#name')
      .pause(1000)
      .setValueWithChangeEvent('#name', data)
      .pause(1000)
  }

  this.clickAddToOrder = function(){
  	return browser
      .waitForElementVisible('#addPackageToOrderButton')
      .pause(1000)
  		.click('#addPackageToOrderButton')
      .pause(6000)
  }

  this.selectStartDateFromToday = function(data) {
    if(data.term==='days'){
        var count = data.count -1;
      }

      if(data.term==='weeks'){
        var count = (data.count * 7) -1;
        var term = 'days'
      }
      browser.waitForElementVisible('.filter-dates .date-picker .date')
      .pause(1000)
      browser.getValue('.filter-dates .date-picker .date', function(result) {

        var startDateText = result.value;
        var newStartDate = moment(startDateText, 'DD/MM/YY').add(count,term);
        var newStartDateText = newStartDate.format('DD/MM/YY');

        browser
          .setValueWithChangeEvent('.filter-dates .date-picker .date', newStartDateText)
          .saveScreenshot(generateScreenShotFilePath('Start date selected'))
          .pause(1000)
      });

      return browser;

  }

this.checkOpeProgress = function() {
    return browser
      .waitForElementVisible('.long-running-process', 100000)
      //.waitForElementPresent('.long-running-process', 100000)
      .waitForElementNotVisible('.long-running-process', 200000, true, captureOpeStatus)
      //.waitForElementNotPresent('.long-running-process', 200000, true, captureOpeStatus)
      .pause(2000)
  }

  function captureOpeStatus() {
    browser.saveScreenshot(generateScreenShotFilePath('OPE Status'));
  }


}