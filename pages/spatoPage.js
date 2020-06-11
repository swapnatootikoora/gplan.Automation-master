var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

  this.saveAirtimeSp =  function(){
    return browser
      .click('#buttonSaveSP')
      .waitForElementNotPresent('#buttonSaveSP .loading')
      .saveScreenshot(generateScreenShotFilePath('Saved S&P page'));
  }

  this.saveAndContinueSp = function() {
    return browser
      //.waitForElementVisible('#buttonSaveAndContinueSP')
      .waitForElementPresent('#buttonSaveAndContinueSP')
      .click('#buttonSaveAndContinueSP')
      .pause(2000)
      //.waitForElementVisible('.plan-page')
    	.saveScreenshot(generateScreenShotFilePath('S&P Plan Page'));
  }

  this.addDefaultProductsAndSpotlength = function() {
    return browser
      .waitForElementPresent('#add_new_spotlength')
      .waitForElementVisible('#add_new_spotlength')
      //.getLocationInView('#add_new_spotlength')
      .scrollToElement('#list_spotlengths')
      .selectOption('#spotlengthsProductList', 'Contra Promo Trailer')
      .pause(1000)
      .click('#add_new_spotlength')
      .pause(1000)
      //.scrollToElement('#list_spotlengths')    
      .waitForElementPresent('#list_spotlengths > li')
      .saveScreenshot(generateScreenShotFilePath('S&P products & spot length details'))
  }  

  this.addProductAndSpotlength = function(data) {
    browser
      .waitForElementPresent('#add_new_spotlength')
      .waitForElementVisible('#add_new_spotlength')
      .scrollToElement('#add_new_spotlength')
      .selectOption('#spotlengthsProductList',data.product)
      .clearValue('#newSpotlength')
      .setValue('#newSpotlength',data.spotlength)
      .click('#add_new_spotlength')
      .pause(1000)
      .waitForElementPresent('#list_spotlengths > li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option details'))
    return browser;
  }

  this.addSingleRajar = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .scrollToElement('#buttonAddBuyingArea')
      .getLocationInView('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .waitForElementVisible('.brands-and-groups-list')
      .click('#globalBrandsList > li:nth-child(2) span') // Heart
      .pause(1000)
      .waitForElementVisible('#baListForBrand')
      .click('#baListForBrand li:nth-child(3) .select-item-check') // Heart 80s
      //.waitForElementNotPresent('#baListForBrand li:nth-child(2) .select-item-check:not(:checked)')
      .click('#buttonAddSelectedBas')
      .pause(1000)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('S&P option buying areas'))
  }

  this.addNetworkBuyingArea = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(2000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click('.navigation-list .navigation-item:first-child')
      .waitForElementVisible('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .click('#baListForBrand li.select-item:first-child .select-item-check')
      .waitForElementNotPresent('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .click('#buttonAddSelectedBas')
      .waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('S&P option buying areas'))
  }

    //Adding Multiple RAJAR and Non RAJAR BA
  this.addMultipleRajarAndNonRajarBuyingAreas = function() {
      clickAddBuyingAreas();
      //selectSingleRajarBuyingAreaFromBrands();
      //selectWholeBrandRajarBuyingAreaFromBrands();
      this.selectRajarAndNonRajarFromBroadCastCentre();
      clickAddSelectedButtonInBuyingAreaPopup();
    return browser;
  }

  function clickAddBuyingAreas() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(2000)
      .waitForElementVisible('.buying-area-selection-dialog')
  }

  this.selectSingleRajarBuyingAreaFromBrands = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .scrollToElement('#buttonAddBuyingArea')
      .getLocationInView('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .waitForElementVisible('.brands-and-groups-list')
      .click('#globalBrandsList > li:nth-child(1) span') // Capital
      .pause(1000)
      .waitForElementVisible('#baListForBrand')
      .click('#baListForBrand li:nth-child(2) .select-item-check') // Capital Birmingham
      //.waitForElementNotPresent('#baListForBrand li:nth-child(2) .select-item-check:not(:checked)')
      .click('#buttonAddSelectedBas')
      .pause(1000)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('S&P option buying areas'))
  }

  function selectWholeBrandRajarBuyingAreaFromBrands() {
    return browser
      .click('.navigation-list .navigation-item:last-child .select-nav-check')
      .pause(2000)
      .waitForElementVisible('#baListForBrand')
      .verify.elementNotPresent('#baListForBrand .select-item-check:not(:checked)')
  }

  function clickAddSelectedButtonInBuyingAreaPopup(){
    return browser
      .click('#buttonAddSelectedBas')
      .pause(2000)
      .waitForElementNotPresent('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.selectRajarAndNonRajarFromBroadCastCentre = function(){
    return browser
      .click("label[for='broadcastCentresRadio']")
      .pause(1000)
      .click('#broadcastCentresList > li:nth-child(11) span') // North West & Wales
      .pause(1000)
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('#baListForBroadcastCentre .select-item:nth-child(2) h3 .select-item-check') // Heart North Wales (Communicorp)
      .click('#baListForBroadcastCentre .select-item:first-child h3 .select-item-check') // Capital North West and Wales
      .click('#baListForBroadcastCentre .sub-select-item:nth-child(1) h3 .select-item-check') // Capital North West and Wales - Anglesey & Gwynedd
      .click('#baListForBroadcastCentre .sub-select-item:nth-child(2) h3 .select-item-check') // Capital North West and Wales - N.East Wales & Cheshire
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

  this.calculateStartDateFromNextDay = function(data) {

    if(data.term==='days'){
      var count = data.count;
      var term = data.term;
    }

    if(data.term==='weeks'){
      var count = (data.count * 7);
      var term = 'days'
    }

    browser.waitForElementVisible('#spairtimeOptionDates .date-range-field-start .date')
    browser.getValue('#spairtimeOptionDates .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var newStartDate = moment().add(count,term);
      var newStartDateText = newStartDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('#spairtimeOptionDates .date-range-field-start .date', newStartDateText)
        .saveScreenshot(generateScreenShotFilePath('Start date selected'))
    });

    return browser;
  }

  this.configureBuyingAreaDiscounts = function(data) {
    return browser
      .waitForElementVisible('#selectedBuyingAreas .buying-areas-area:first-child .area-name-container span')
      .click('#selectedBuyingAreas .buying-areas-area:first-child .area-name-container span')
      .waitForElementVisible('#selectedBuyingAreas .buying-areas-area:first-child .discount-input')
      .clearValue('#selectedBuyingAreas .buying-areas-area:first-child .discount-input')
      .setValueWithChangeEvent('#selectedBuyingAreas .buying-areas-area:first-child .discount-input', data)
      .saveScreenshot(generateScreenShotFilePath('BA discount'));
  };

  this.configureTacticalDiscounts = function(data) {
    return browser
      .waitForElementVisible('#tacticalDiscount')
      .clearValue('#tacticalDiscount')
      .setValueWithChangeEvent('#tacticalDiscount', data)
  };

  this.configureNetworkDiscounts = function(data) {
    return browser
      .waitForElementVisible('.network-discount-container:first-child')
      .clearValue('.network-discount-container:first-child input.discount-input')
      .setValueWithChangeEvent('.network-discount-container:first-child input.discount-input', data)
  }

  this.closeRepricingDialog = function() {
      return browser
        .waitForElementVisible('.footer-flyout-repricing-warning')
        .click('.footer-flyout-repricing-warning .cancel-action')
        .waitForElementNotVisible('.footer-flyout-repricing-warning')
  }
};