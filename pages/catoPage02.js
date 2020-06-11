var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

  this.enterAirtimeDetails = function(data) {

    var now = new Date();
    var airtimeName = data.name + ' ' + moment().format('DD/MM HH:mm');

  	browser
      .setValueWithChangeEvent('#name', airtimeName)
      .click('#spairtimeOptionDates .date-range-field-start .date')
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group:nth-child(2) .ui-datepicker-calendar', 2, 4) //4 week Order
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group:nth-child(3) .ui-datepicker-calendar', 2, 3)
      .click('.date-picker-popup .close-popup')
      .selectOption('#timepickerStartHours', data.startHour)
      .selectOption('#timepickerStartMinutes', data.startMinute)
      .selectOption('#timepickerEndHours', data.endHour)
      .selectOption('#timepickerEndMinutes', data.endMinute)
      .click('#add_new_spotlength')
      .waitForElementVisible('#list_spotlengths > li')
      .selectOption('#spotlengthsProductList', 'Value Pot')
      .clearValue('#newSpotlength')
      .setValue('#newSpotlength', '300')
      .click('#add_new_spotlength')
      .waitForElementVisible('#list_spotlengths > li:nth-child(2)')
      .saveScreenshot(generateScreenShotFilePath('Airtime option details'))

    return browser;
  }

//nth child for BA is Odd Numbers
  this.addBuyingAreas = function() {

    return browser
      .getLocationInView('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .waitForElementVisible('.buying-area-selection-dialog')
      .click('.navigation-list .navigation-item:nth-child(5)')
      .waitForElementVisible('#baListForBrand')
      .click('#baListForBrand li:first-child .select-item-check')
      .click('.navigation-list .navigation-item:last-child .select-nav-check')
      .waitForElementVisible('#baListForBrand')
      .verify.elementNotPresent('#baListForBrand .select-item-check:not(:checked)')
      .click("label[for='broadcastCentresRadio']")
      .pause(1000)
      .click('.brands-and-groups-list div:nth-child(2) .navigation-item:nth-child(2)')
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('#baListForBroadcastCentre .select-item:first-child h3 .select-item-check')
      .click('#buttonAddSelectedBas')
      .waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.configureWeekDaysDayparts = function() {

    return browser
      .click('#buttonEditPlanDaysAndDayparts')
      .waitForElementVisible('.days-dayparts-table')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(1)')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(3)')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(5)')
      .click('.days-dayparts-table .dayparts-button-list button:first-child')
      .click('.days-dayparts-table .dayparts-button-list button:last-child')
      .click('#popupWeekdaysDaypartsCloseButton')
      //.waitForElementNotVisible('.popup-weekdays-dayparts')
      //.click('#buttonEditWeeksDaysAndDayparts')
      //.waitForElementVisible('#tableRestrictionsWeeks')
      //.click('#tableRestrictionsWeeks li:first-child .checkbox')
      .saveScreenshot(generateScreenShotFilePath('Airtime option weeks days dayparts'))
  }

  this.configureBudgetAndDiscounts = function(data) {

    return browser
      .clearValue('#budget')
      .clearValue('#upsell')
      .clearValue('#tacticalDiscount')
      .setValue('#budget', data.budget)
      .setValue('#upsell', data.upsellTo)
      .setValueWithChangeEvent('#tacticalDiscount', data.tacticalDiscount)
  };

  this.saveAndContinueAirtime = function() {

    return browser
      .click('#buttonSaveAndContinueSP')
  }

  this.checkOpeProgress = function() {

    return browser
      .waitForElementVisible('.long-running-process', 15000)
      .waitForElementNotVisible('.long-running-process', 120000, true, captureOpeStatus)
      .waitForElementVisible('.plan-page')
  }


  function captureOpeStatus() {
    browser.saveScreenshot(generateScreenShotFilePath('OPE Status'));
  }
};