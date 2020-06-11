var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

/*  this.addDaxDetails = function() {

    browser
      .click('.nav-menu-show')
      .waitForElementVisible('#breadCrumbs li:first-child .spa-nav-popup-breadcrumbs')
      .click('#breadCrumbs li:first-child .spa-nav-popup-breadcrumbs li:last-child a')
      .waitForElementVisible('#territorySelect')
      .saveScreenshot(generateScreenShotFilePath('DAX Option Page'))

    return browser;

} */

  this.setSingleDAXFlight = function(data) {
      setGrossRevenue(data.grossRevenue);
      setCPM(data.cpm);
      fixDaxFlightEndDate(1);
      setAudioSource(data.audioSource)
    return browser.saveScreenshot(generateScreenShotFilePath('Dax options filled in'))
  }

  this.saveAndContinueDAX = function() {
    return browser
      .waitForElementVisible('.save-and-continue-button')
      .click('.save-and-continue-button')
  }

  function saveDAX() {
    return browser
      .click('.save-button')
      .waitForElementNotPresent('.save-button .loading')
      .saveScreenshot(generateScreenShotFilePath('Saved DAX page'));
  }

  function setGrossRevenue(data){
    return browser
      .waitForElementVisible('.audio-gross-revenue')
      .clearValue('.audio-gross-revenue')
      .setValueWithChangeEvent('.audio-gross-revenue', data)
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

  function fixDaxFlightEndDate(nth) {
    browser.getValue('.details-pane .date-range-field-end .date', function(result) {
      browser
        .setValueWithChangeEvent('.audio-list-table .audio-row:nth-child('+ nth +') .date-range-field-end .date', result.value)
        .saveScreenshot(generateScreenShotFilePath('End date fixed selected'))
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

};