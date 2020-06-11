var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

this.calculateAndSelectStartDate = function(data) {

  if(data.term==='days'){
    var count = data.count;
  }

  if(data.term==='weeks'){
    var count = (data.count * 7);
    var term = 'days'
  }
  browser.waitForElementVisible('.details-pane .date-range-field-start .date')
  browser.getValue('.details-pane .date-range-field-start .date', function(result) {

    var startDateText = result.value;
    var newStartDate = moment(startDateText, 'DD/MM/YY').add(count,term);
    var newStartDateText = newStartDate.format('DD/MM/YY');

    browser
      .setValueWithChangeEvent('.details-pane .date-range-field-start .date', newStartDateText)
      .saveScreenshot(generateScreenShotFilePath('Start date selected'))
  });

  return browser;
}

this.calculateAndSelectEndDate = function(data) {

  if(data.term==='days'){
    var count = data.count -1;
  }

  if(data.term==='weeks'){
  var count = (data.count * 7) -1;
  var term = 'days'
  }
  browser.waitForElementVisible('.details-pane .date-range-field-end .date')
  browser.getValue('.details-pane .date-range-field-start .date', function(result) {

  var startDateText = result.value;
  var endDate = moment(startDateText, 'DD/MM/YY').add(count,term);
  var endDateText = endDate.format('DD/MM/YY');

  browser
    .setValueWithChangeEvent('.details-pane .date-range-field-end .date', endDateText)
    .saveScreenshot(generateScreenShotFilePath('Start and End date selected'))
});

return browser;
}

this.selectDigitalProduct = function(data) {
  browser
  .waitForElementVisible('.digital-main-info-column .select-container select')
  .selectOption('.digital-main-info-column .select-container select', data)
  .pause(2000)
  return browser;
}

this.selectDigitalSubProduct = function(data) {
  browser
  .waitForElementVisible('.digital-main-info-column .select-container select')
  .useXpath()
  .click('//*[@id="applicationHost"]/div/main/div[1]/section/div/section/table/tbody/tr/td[4]/div[2]/div/select/option[3]')
  .pause(2000)
  .useCss()
  return browser;
}

this.setSingleDigitalFlightRevenueOnly = function(data) {
  setGrossRevenue(data);
  //setImpressions(data.impressions);
  return browser
  .saveScreenshot(generateScreenShotFilePath('Flight Revenue filled in'))
}

this.verifyImpressionsReadOnly = function() {
  return browser
    .waitForElementVisible('.digital-revenue-column')
    .pause(2000)
    /*.useXpath()
    .getAttribute('//*[@id="applicationHost"]/div/main/div[1]/section/div/section/table/tbody/tr/td[6]/div/div[3]/div/input', 'readonly', function(readonly) {
      browser.verify.equal(readonly.value, "null", 'readonly value is ' + readonly.value + ' and expected is true')
    .useCss()*/
    .getAttribute('#applicationHost > div > main > div.dax-option-page.digital-option-page > section > div > section > table > tbody > tr > td.digital-revenue-column > div > div:nth-child(3) > div > input', 'readonly', function(readonly) {
        browser.verify.equal(readonly.value, "true", 'readonly value is ' + readonly.value + ' and expected is true')
   
  });
}
/*this.setSingleDigitalFlightRevenueAndImpressions = function(data) {
  setGrossRevenue(data.grossRevenue);
  setImpressions(data.impressions);
  return browser
  .saveScreenshot(generateScreenShotFilePath('Flight Revenue and Impressions filled in'))
}*/

this.calculateAndSelectFlightStartDate = function(data) {

  if(data.term==='days'){
    var count = data.count;
  }

  if(data.term==='weeks'){
    var count = (data.count * 7);
    var term = 'days'
  }
  browser.waitForElementVisible('.digital-main-info-column .date-range-field-start .date')
  browser.getValue('.digital-main-info-column .date-range-field-start .date', function(result) {

    var startDateText = result.value;
    var newStartDate = moment(startDateText, 'DD/MM/YY').add(count,term);
    var newStartDateText = newStartDate.format('DD/MM/YY');

    browser
      .setValueWithChangeEvent('.digital-main-info-column .date-range-field-start .date', newStartDateText)
      .saveScreenshot(generateScreenShotFilePath('Start date selected'))
  });

  return browser;
}

this.calculateAndSelectFlightEndDate = function(data) {

  if(data.term==='days'){
    var count = data.count -1;
  }

  if(data.term==='weeks'){
  var count = (data.count * 7) -1;
  var term = 'days'
  }
  browser.waitForElementVisible('.digital-main-info-column .date-range-field-end .date')
  browser.getValue('.digital-main-info-column .date-range-field-start .date', function(result) {

  var startDateText = result.value;
  var endDate = moment(startDateText, 'DD/MM/YY').add(count,term);
  var endDateText = endDate.format('DD/MM/YY');

  browser
    .setValueWithChangeEvent('.digital-main-info-column .date-range-field-end .date', endDateText)
    .pause(1000)
    .saveScreenshot(generateScreenShotFilePath('Start and End date selected'))
    });

return browser;
}

   this.addSingleNonRajar = function() {
    return browser
      .waitForElementPresent('.buying-area-column')
      .waitForElementVisible('.buying-area-column')
      .click('.dialog-opener')
      .pause(2000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click("label[for='broadcastCentresRadio']")
      .pause(1000)
      //.click('#globalBrandsList > li:first-child span')
      //.click('.navigation-list .navigation-item:first-child')
      .click('#broadcastCentresList > li:nth-child(3) span')
      .pause(1000)
      //.click('.brands-and-groups-list div:nth-child(2) .navigation-item:nth-child(2)')
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('.navigation-item:first-child')
      .waitForElementVisible('.sub-select-item-heading')
      .click('.sub-select-item:nth-child(2) h3 .select-item-check') 
      .verify.elementPresent('.sub-select-item:nth-child(2) h3 .select-item-check:not(:checked)') 
      .click('#buttonAddSelectedBas')
      .pause(2000)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      //.verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))    
  }

  this.saveAndContinueDigital = function() {
    return browser
      .waitForElementVisible('.save-and-continue-button')
      .click('.save-and-continue-button')
      .pause(2000)
  }  

  function setGrossRevenue(data){
    return browser
      .waitForElementVisible('.flight-gross-revenue')
      .clearValue('.flight-gross-revenue')
      .setValueWithChangeEvent('.flight-gross-revenue', data)
  }

  /*
  function saveDigital() {
    return browser
      .click('.save-button')
      .waitForElementNotPresent('.save-button .loading')
      .saveScreenshot(generateScreenShotFilePath('Saved Digital page'));
  }

  function setCPM(data){
    return browser
      .waitForElementVisible('.audio-cpm')
      .clearValue('.audio-cpm')
      .setValueWithChangeEvent('.audio-cpm', data)
  }

  function setAudioSource(data){
    return browser
      .waitForElementVisible('.audio-details-column .select-container select')
      .selectOption('.audio-details-column .select-container select', data)
  }

  function fixDigitalFlightEndDate(nth) {
    browser.getValue('.details-pane .date-range-field-end .date', function(result) {
      browser
        .setValueWithChangeEvent('.audio-list-table .audio-row:nth-child('+ nth +') .date-range-field-end .date', result.value)
        .saveScreenshot(generateScreenShotFilePath('End date fixed selected'))
    });

    return browser;
  } */
};