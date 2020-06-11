var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');
var data = require('../data/dataProvider');

module.exports = function (browser) {

/*  this.enterAirtimeDetails = function(data) {

    var now = new Date();
    var airtimeName = data.name + ' ' + moment().format('DD/MM HH:mm');

  	browser
      .setValueWithChangeEvent('#name', airtimeName)
      .click('#spairtimeOptionDates .date-range-field-start .date')
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group:nth-child(2) .ui-datepicker-calendar', 2, 1)
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group:nth-child(2) .ui-datepicker-calendar', 3, 7)
      .click('.date-picker-popup .close-popup')
      .selectOption('#timepickerStartHours', data.startHour)
      .selectOption('#timepickerStartMinutes', data.startMinute)
      .selectOption('#timepickerEndHours', data.endHour)
      .selectOption('#timepickerEndMinutes', data.endMinute)
      .click('#add_new_spotlength')
      .waitForElementVisible('#list_spotlengths > li')
      .selectOption('#spotlengthsProductList', 'Value Pot')
      .clearValue('#newSpotlength')
      .setValue('#newSpotlength', '50')
      .click('#add_new_spotlength')
      .waitForElementVisible('#list_spotlengths > li:nth-child(2)')
      .saveScreenshot(generateScreenShotFilePath('Airtime option details'))

    return browser;
  } */

  this.selectStartAndEndTimeForAnOrder =  function(data){
      return browser
        .selectOption('#timepickerStartHours', data.startHours)
        .pause(100)
        .selectOption('#timepickerStartMinutes', data.startMinutes)
        .pause(100)
        .selectOption('#timepickerEndHours', data.endHours)
        .pause(100)
        .selectOption('#timepickerEndMinutes', data.endMinutes)
        .pause(1000)
  }

  this.selectApplyStartAndEndTimesToAllDays = function(data){
      return browser
        //.scrollToElement('.checkbox-container-apply-time-to-all input')
        .waitForElementPresent('.checkbox-container-apply-time-to-all input')
        .click('.checkbox-container-apply-time-to-all input')
        .pause(1000)
  
  }

  this.pickStartDateIn2MonthsStartSecondWeekWithOffset = function(data) {
    browser
      .waitForElementVisible('#spairtimeOptionDates .date-range-field-start .date')
      .click('#spairtimeOptionDates .date-range-field-start .date')
      .pause(1000)
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group-last .ui-datepicker-calendar', 3, data.count)
      .waitForElementVisible('.ui-datepicker')
      .click('.date-picker input')
      .pause(500)
      //.click('.date-picker-popup .close-popup')
      //.pause(1000)

    return browser;
  }

  this.calculateAndSelectEndDate = function(data) {

    if(data.term==='days'){
      var count = data.count -1;
      var term = data.term;
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
        .click('.date-picker input')
        .pause(1000)
        .saveScreenshot(generateScreenShotFilePath('End date selected'))
        .click('.date-picker-popup .close-popup')

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

  this.startIn52Weeks = function(weeks) {
    browser
      .click('#spairtimeOptionDates .date-range-field-start .date')
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group:nth-child(3) .ui-datepicker-calendar', 1, 3)
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group:nth-child(3) .ui-datepicker-calendar', ++weeks, 51)
      .click('.date-picker-popup .close-popup')

    return browser;
  }

  this.selectBaseAudiences = function(data) {
    browser
      .selectOption('#baseDemographicSelect', data.base)

    return browser;
  }

  this.selectTargetAudiences = function(data) {
    browser
      .click('#targetDemographic')
      .selectOption('#targetDemographic', data.target)

    return browser;
  }
  
  this.avoidUnderage = function() {
    return browser
        .waitForElementVisible('.under-age-constraint-container')
        .pause(1000)
        .click('.under-age-constraint-container input')

    }

  this.addDefaultProductsAndSpotlength = function() {
    browser
      .waitForElementPresent('#add_new_spotlength')
      //.getLocationInView('#list_spotlengths')
      .waitForElementVisible('#add_new_spotlength')
      .scrollToElement('#add_new_spotlength')
      .click('#add_new_spotlength')
      .pause(1000)
      .waitForElementVisible('#list_spotlengths')
      .saveScreenshot(generateScreenShotFilePath('Airtime option details'))

    return browser;
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
      .waitForElementVisible('#list_spotlengths > li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option details'))

    return browser;
  }

  this.addProductAndSpotlengthTopAndTail = function(data) {
    browser
      .waitForElementPresent('#add_new_spotlength')
      .waitForElementVisible('#add_new_spotlength')
      .scrollToElement('#add_new_spotlength')
      .selectOption('#spotlengthsProductList', data.product)
      .clearValue('#newSpotlength')
      .click('#newSpotlength')
      .waitForElementVisible('#topAndTailLink')
      .click('#topAndTailLink')

      .waitForElementVisible('#durationFirst')
      .setValue('#durationFirst', data.spotlengthTop)
      .pause(500)

      .waitForElementVisible('#durationSecond')
      .setValue('#durationSecond', data.spotlengthMiddle)
      .pause(500)

      .waitForElementVisible('#durationLast')
      .setValue('#durationLast', data.spotlengthTail)
      .pause(500)

      .waitForElementVisible('#addTopAndTail')
      .click('#addTopAndTail')
      .pause(500)

      .waitForElementVisible('#list_spotlengths > li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option details'))

    return browser;
  }

  this.verifyTopMiddleTail = function(data) {
    browser.getText('.m-spotlengths-cell > .subtitle', function(result) {
      browser.pause(500);
      browser.verify.equal(result.value, 'Top '+data.spotlengthTop+', Middle '+data.spotlengthMiddle+', Tail '+data.spotlengthTail, 'Top Middle Tail is expected');
    });

    return browser;
  }

  this.verifySpotLengthDurationIsTopMiddleTailSum = function(data) {
    browser.getValue('.spot-length-duration', function(result) {
      browser.pause(500);
      browser.verify.equal(result.value, Number(data.spotlengthTop) + Number(data.spotlengthMiddle) + Number(data.spotlengthTail), 'Top Middle Tail is summed up in spot length duration')
    });

    return browser;
  }

  this.addBuyingAreas = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click('.navigation-list .navigation-item:first-child')
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
      .pause(1000)
      //.waitForElementNotPresent('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.addCapitalManchesterAndSmoothNorthWestBuyingAreas = function() {
    return browser
      //.getLocationInView('#list_spotlengths')
      //.getLocationInView('h1.sp-ato-heading')
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click('.navigation-list .navigation-item:first-child') //Capital
      .pause(1000)
      .waitForElementVisible('#baListForBrand')
      .click('#baListForBrand li:nth-child(6) .select-item-check') //Capital Manchester
      .pause(1000)
      .click('#baListForBrand li:nth-child(14) .select-item-check') //Capital Yorkshire
      .pause(1000)
      .click("label[for='broadcastCentresRadio']") //Broadcast Centres
      .pause(1000)
      .waitForElementVisible('#broadcastCentresList')
      .click('#broadcastCentresList > li:nth-child(12) span') //North West
      .pause(1000)
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('#baListForBroadcastCentre li:nth-child(8) .select-item-check') //Smooth Radio North West
      .pause(1000)
      //.click('.navigation-list .navigation-item:first-child')
      .click('#buttonAddSelectedBas')
      .pause(1000)
      .waitForElementNotPresent('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.addRajarAndNonRajarBuyingAreas = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click('.navigation-list .navigation-item:first-child') //Capital
      .pause(1000)
      .waitForElementVisible('#baListForBrand')
      .click('#baListForBrand li:first-child .select-item-check') //Capital Birmingham
      .click("label[for='broadcastCentresRadio']") //Broadcast Centres
      .pause(1000)
      .click('.brands-and-groups-list div:nth-child(3) .navigation-item:nth-child(8)') //Kent
      .pause(1000)
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('.sub-select-item:nth-child(2) h3 .select-item-check') //Heart Kent - West
      .click('#buttonAddSelectedBas')
      .pause(1000)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
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

  //Add Single non Rajar Buying Area
  this.addSingleNonRajar = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(500)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click("label[for='broadcastCentresRadio']")
      .pause(500)
      //.click('#globalBrandsList > li:first-child span')
      //.click('.navigation-list .navigation-item:first-child')
      .click('#broadcastCentresList > li:nth-child(4) span')
      .pause(500)
      .click('.brands-and-groups-list div:nth-child(3) .navigation-item:nth-child(8)') //Kent
      .pause(1000)
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('.sub-select-item:nth-child(2) h3 .select-item-check') //Heart Kent - West
      .click('#buttonAddSelectedBas')
      .pause(500)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))    
  }

  //Adding Multiple RAJAR and Non RAJAR BA
  this.addMultipleRajarBuyingAreas = function() {
    this.addSingleRajar();
    this.addWholeBrandAsBuyingArea();
      
      return browser
  }

  function clickAddSelectedButtonInBuyingAreaPopup(){
    return browser
      .click('#buttonAddSelectedBas')
      .waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.selectRajarAndNonRajarFromBroadCastCentre = function(){
    return browser
      .click("label[for='broadcastCentresRadio']")
      .pause(1000)
      //.click('.brands-and-groups-list div:nth-child(2) .navigation-item:nth-child(2)')
      .click('#broadcastCentresList > li:nth-child(11) span') // North West & Wales
      .pause(1000)
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('#baListForBroadcastCentre .select-item:nth-child(2) h3 .select-item-check') // Heart North Wales (Communicorp)
      .click('#baListForBroadcastCentre .select-item:first-child h3 .select-item-check') // Capital North West and Wales
      .click('#baListForBroadcastCentre .sub-select-item:nth-child(1) h3 .select-item-check') // Capital North West and Wales - Anglesey & Gwynedd
      .click('#baListForBroadcastCentre .sub-select-item:nth-child(2) h3 .select-item-check') // Capital North West and Wales - N.East Wales & Cheshire
  }

  function selectSingleRajarBuyingAreaFromBrands() {
    return browser
      .click('.navigation-list .navigation-item:first-child')
      .waitForElementVisible('#baListForBrand')
      .click('#baListForBrand li:first-child .select-item-check')
  }

  function selectWholeBrandRajarBuyingAreaFromBrands() {
    return browser
      .click('.navigation-list .navigation-item:last-child .select-nav-check')
      .waitForElementVisible('#baListForBrand')
      .verify.elementNotPresent('#baListForBrand .select-item-check:not(:checked)')
  }

  function clickAddBuyingAreas() {
    return browser
        .click('#buttonAddBuyingArea')
        .pause(2000)
        .waitForElementVisible('.buying-area-selection-dialog')
  }

  this.addWholeBrandAsBuyingArea = function () {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .getLocationInView('h1.sp-ato-heading')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click('#globalBrandsList .navigation-item:nth-child(3) .select-nav-check') // Classic FM
      .pause(1000)
      .waitForElementVisible('#baListForBrand')
      //.verify.elementNotPresent('#baListForBrand .select-item-check:not(:checked)')
      .click('#buttonAddSelectedBas')
      .waitForElementNotPresent('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }
  this.addSingleRajar = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      //.pause(1000)
      .getLocationInView('h1.sp-ato-heading')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      //.waitForElementVisible('.brands-and-groups-list')
      .click('#globalBrandsList > li:nth-child(1) span') // Capital
      .pause(1000)
      .waitForElementVisible('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .click('#baListForBrand li.select-item:first-child .select-item-check') // Capital Birmingham
      .pause(1000)
      .waitForElementNotPresent('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .click('#buttonAddSelectedBas')
      .pause(1000)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.addBroadCastCentre = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(2000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click("label[for='broadcastCentresRadio']")
      .pause(1000)
      .click('.brands-and-groups-list div:nth-child(2) .navigation-item:nth-child(2)')
      .waitForElementVisible('#baListForBroadcastCentre')
      .click('#baListForBroadcastCentre .select-item:first-child h3 .select-item-check')     
      .click('#buttonAddSelectedBas')
      .pause(1000)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.addMultipleBroadcastCentres = function() {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(2000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click("label[for='broadcastCentresRadio']")
      .pause(1000)
      .click('#broadcastCentresList > li:nth-child(4) .select-nav-check')
      .click('#broadcastCentresList > li:nth-child(8) .select-nav-check')
      //.waitForElementVisible('#baListForBroadcastCentre')  
      .click('#buttonAddSelectedBas')
      .waitForElementNotVisible('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.addSingleBAIG = function () {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click("label[for='buyingAreaGroupIncentiveRadio']")
      .pause(1000)
      .click('.brands-and-groups-list div:nth-child(3) .navigation-item:nth-child(9) .select-nav-check')
      .pause(1000)
      .click('#buttonAddSelectedBas')
      .pause(500)
      .waitForElementNotPresent('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }

  this.addMultipleBAIG = function () {
    return browser
      .waitForElementPresent('#buttonAddBuyingArea')
      .waitForElementVisible('#buttonAddBuyingArea')
      .click('#buttonAddBuyingArea')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .click("label[for='buyingAreaGroupIncentiveRadio']")
      .pause(1000)
      //.click('.brands-and-groups-list div:nth-child(4) .navigation-item:nth-child(19) .select-nav-check') //Classic FM TEST
      .click('.brands-and-groups-list div:nth-child(4) .navigation-item:nth-child(15) .select-nav-check') //Classic FM UAT
      //.click('.brands-and-groups-list div:nth-child(4) .navigation-item:nth-child(14) .select-nav-check') //Gold Network TEST
      .click('.brands-and-groups-list div:nth-child(4) .navigation-item:nth-child(28) .select-nav-check') //LBC Network
      .pause(1000)
      .click('#buttonAddSelectedBas')
      .pause(500)
      .waitForElementNotPresent('.buying-area-selection-dialog')
      .verify.elementPresent('#selectedBuyingAreas li')
      .saveScreenshot(generateScreenShotFilePath('Airtime option buying areas'))
  }
  this.configureWeekOnWeekOff = function() {
    return browser
      .click('.button-include-week-on')
      .pause(2000)
      //.click('.button-include-week-on')
      //.pause(1000)       
  }; 

  this.configureWeekDaysDayparts = function() {
    return browser
      .click('#buttonEditPlanDaysAndDayparts')
      .waitForElementVisible('.days-dayparts-table')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(2)')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(4)')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(6)')
      .click('.days-dayparts-table .dayparts-button-list button:nth-child(3)')
      .click('.days-dayparts-table .dayparts-button-list button:nth-child(5)')
      .click('#popupWeekdaysDaypartsCloseButton')
      .waitForElementNotVisible('.popup-weekdays-dayparts')
      .click('#buttonEditWeeksDaysAndDayparts')
      .waitForElementVisible('#tableRestrictionsWeeks')
      .click('#tableRestrictionsWeeks li:last-child .checkbox')
      .saveScreenshot(generateScreenShotFilePath('Airtime option weeks days dayparts'))
  }

  this.configureWeekDaysAndTimebands = function(data) {
    return browser
      .click('#buttonEditPlanDaysAndDayparts')
      .waitForElementVisible('.days-dayparts-table')
      .waitForElementVisible('.durandal-wrapper > a:nth-child(3)')
      .click('.durandal-wrapper > a:nth-child(3)')
      .waitForElementVisible('.durandal-wrapper .buttons-container .primary-action')
      .click('.durandal-wrapper .buttons-container .primary-action')
      //.click('.days-dayparts-table .weekdays-button-list button:nth-child(1)')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(2)')
      //.click('.days-dayparts-table .weekdays-button-list button:nth-child(3)')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(4)')
      //.click('.days-dayparts-table .weekdays-button-list button:nth-child(5)')
      .click('.days-dayparts-table .weekdays-button-list button:nth-child(6)')
      //.click('.days-dayparts-table .weekdays-button-list button:nth-child(7)')
      .waitForElementVisible('.timeband-select > select.timepicker-start')
      .selectOption('.timeband-select > select.timepicker-start', data.startHours)
      .selectOption('.timeband-select > select.timepicker-start-minutes', data.startMinutes)
      .selectOption('.timeband-select > select.timepicker-end', data.endHours)
      .selectOption('.timeband-select > select.timepicker-end-minutes', data.endMinutes)
      .click('#popupWeekdaysDaypartsCloseButton')
      .waitForElementNotVisible('.popup-weekdays-dayparts')
      .saveScreenshot(generateScreenShotFilePath('Airtime option weeks days dayparts'))
  }

  this.configureWeekDaysTimebandsForAllDays = function(data) {
    return browser
      .click('#buttonEditPlanDaysAndDayparts')
      .waitForElementVisible('.days-dayparts-table')
      .waitForElementVisible('.durandal-wrapper > a:nth-child(3)')
      .click('.durandal-wrapper > a:nth-child(3)')
      .waitForElementVisible('.buttons-container .primary-action')
      .click('.buttons-container .primary-action')
      .waitForElementVisible('.timeband-select > select.timepicker-start')
      .selectOption('.timeband-select > select.timepicker-start', data.startHours)
      .selectOption('.timeband-select > select.timepicker-start-minutes', data.startMinutes)
      .selectOption('.timeband-select > select.timepicker-end', data.endHours)
      .selectOption('.timeband-select > select.timepicker-end-minutes', data.endMinutes)
      .click('#popupWeekdaysDaypartsCloseButton')
      .waitForElementNotVisible('.popup-weekdays-dayparts')
      .saveScreenshot(generateScreenShotFilePath('Airtime option weeks days dayparts'))
  }

  this.configureBudgetAndDiscounts = function(data) {
    return browser
      .clearValue('#budget')
      .clearValue('#upsell')
      .clearValue('#tacticalDiscount')
      .setValue('#budget', data.budget)
      .setValue('#upsell', data.upsell)
      .setValueWithChangeEvent('#tacticalDiscount', data.tacticalDiscount)
  };

  this.configureBuyingAreaDiscounts = function(data) {
    return browser
      .waitForElementVisible('#selectedBuyingAreas .buying-areas-area:first-child .area-name-container span')
      .click('#selectedBuyingAreas .buying-areas-area:first-child .area-name-container span')
      .waitForElementVisible('#selectedBuyingAreas .buying-areas-area:first-child .discount-input')
      .pause(500)
      .clearValue('#selectedBuyingAreas .buying-areas-area:first-child .discount-input')
      .pause(500)
      .setValueWithChangeEvent('.discount-input', data)
      .saveScreenshot(generateScreenShotFilePath('BA discount'));
  };

  this.setFirstBuyingAreaDateRangeTo1Week = function() {
    browser
      .waitForElementVisible('#selectedBuyingAreas li.buying-areas-area:nth-child(1) .area-name-container')
      .click('#selectedBuyingAreas li.buying-areas-area:nth-child(1) .area-name-container')
      .waitForElementVisible('#selectedBuyingAreas li.buying-areas-area:nth-child(1) .date-range-field-start .date')
      .click('#selectedBuyingAreas li.buying-areas-area:nth-child(1) .date-range-field-start .date')
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group-first .ui-datepicker-calendar', 4, 1)
      .pause(500)
      .waitForElementVisible('.ui-datepicker')
      .clickTableCell('.ui-datepicker-group-first .ui-datepicker-calendar', 4, 7)
      .click('.date-picker-popup .close-popup')
    return browser;
  }

  this.configureTacticalDiscounts = function(data) {
    return browser
      .waitForElementVisible('#tacticalDiscount')
      .clearValue('#tacticalDiscount')
      .setValueWithChangeEvent('#tacticalDiscount', data)
  };

  this.configureABIDiscounts = function(data) {
    return browser
      .waitForElementVisible('#abiDiscount')
      .selectOption('#abiDiscountSelect', data.weeks)
      .clearValue('#abiDiscount')
      .setValueWithChangeEvent('#abiDiscount', data.discount)
  };

  this.verifyNoABIDiscount = function(data) {
    return browser
      .waitForElementVisible('#gPrimeAbiDiscount')
      //.verify.elementPresent('#gPrimeAbiDiscount .select-item-check(:checked)')
      .verify.elementNotPresent('#gPrimeAbiDiscount .select-item-check:not(:checked)')
      .getText('#gPrimeAbiDiscount + label', function(textResponse) {
        browser.verify.equal('0%', textResponse.value)
        console.log(textResponse)})
  };
  
  this.verifyABIDiscountNational = function(data) {
    return browser
      .waitForElementVisible('#gPrimeAbiDiscount')
      //.verify.elementPresent('#gPrimeAbiDiscount .select-item-check(:checked)')
      .verify.elementNotPresent('#gPrimeAbiDiscount .select-item-check:not(:checked)')
      .getText('#gPrimeAbiDiscount + label', function(textResponse) {
        browser.verify.equal('-10%', textResponse.value);
        console.log(textResponse);})
  };

  this.verifyABIDiscountLocal = function(data) {
    return browser
      .waitForElementVisible('#gPrimeAbiDiscount')
      //.verify.elementPresent('#gPrimeAbiDiscount .select-item-check(:checked)')
      .verify.elementNotPresent('#gPrimeAbiDiscount .select-item-check:not(:checked)')
      .getText('#gPrimeAbiDiscount + label', function(textResponse) {
        browser.verify.equal('-25%', textResponse.value);
        console.log(textResponse);})
  };

  this.verifyNoBAIGDiscount = function(data) {
    return browser
      .waitForElementVisible('#buyingAreaIncentiveGroupDiscount24')
      .verify.elementNotPresent('#buyingAreaIncentiveGroupDiscount24 .select-item-check:not(:checked)')
      .getText('#buyingAreaIncentiveGroupDiscount24 + label', function(textResponse) {
        browser.verify.equal('\n                        LBC\n                        0%\n                    ', textResponse.value)
        console.log(textResponse)})
  };

  this.verifyBAIGDiscount = function(data) {
    return browser
      .waitForElementVisible('#buyingAreaIncentiveGroupDiscount4')
      .scrollToElement('#buyingAreaIncentiveGroupDiscount4')
      .verify.elementNotPresent('#buyingAreaIncentiveGroupDiscount4 .select-item-check:not(:checked)')
      .getText('#buyingAreaIncentiveGroupDiscount4 + label', function(textResponse) {
        browser.verify.equal('\n                        Classic FM\n                        -10%\n                    ', textResponse.value)
        console.log(textResponse)})
  };

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

  this.saveAirtime =  function(){
    return browser
      .click('#buttonSaveSP')
      .pause(2000)
      .waitForElementNotPresent('#buttonSaveSP .loading')
      .saveScreenshot(generateScreenShotFilePath('Saved airtime page'));
  }

  this.saveAndContinueAirtime = function() {
    return browser
      .waitForElementVisible('#buttonSaveAndContinueSP')
      .click('#buttonSaveAndContinueSP')
      .pause(2000)
  }

  this.checkOpeProgress = function() {
    return browser
      .waitForElementVisible('.long-running-process', 100000)
      //.waitForElementNotVisible('.long-running-process', 200000, true, captureOpeStatus)
      .waitForElementNotPresent('.long-running-process', 200000, true, captureOpeStatus)
      .waitForElementVisible('.plan-page')
  }

  this.waitForPlanPageToBeVisible = function() {
    return browser
      .waitForElementVisible('.plan-page')
  }

  this.checkOpeProgressOnSave = function() {
    return browser
      .waitForElementVisible('.long-running-process', 300000)
      .waitForElementNotVisible('.long-running-process', 300000, true, captureOpeStatus);
  }

  this.checkNoBarterValuesWarning = function() {
    return browser
      .waitForElementVisible('.field-message.is-warning')
      .getText('.field-message.is-warning > span', function(textResponse) {
         browser.verify.equal('Warning: No barter values entered', textResponse.value); 
         console.log(textResponse);
          }) 
  }

  this.verifyOpeError = function () {
    return browser
      .waitForElementVisible('.status-text is-error > span', function(textResponse) {
        browser.verify.equal('Plans have to be longer than 1 day part', textResponse.value);
        console.log(textResponse);
      })
      .click('.close-button span')
  }


  function captureOpeStatus() {
    browser.saveScreenshot(generateScreenShotFilePath('OPE Status'));
  }

  this.setBuyingAreaDiscountByName = function(buyingAreaName, discount, startDate, endDate) {
    return browser
      .execute(function(baName, baDiscount, baStartDate, baEndDate) {

        $('.buying-areas-area').each(function (index, buyingArea) {

          $buyingArea = $(buyingArea);
          if ($buyingArea.find('.area-name-container span').text() === baName) {

            $buyingArea.find('.area-name-container').click();
            $buyingArea.find('.date-range-field-start .date').val(baStartDate);
            $buyingArea.find('.date-range-field-end .date').val(baEndDate);
            $buyingArea.find('.discount-input').val(baDiscount);
            $buyingArea.find('.discount-input').triggerHandler('change');
            $buyingArea.find('.date-range-field-start .date').triggerHandler('change');
            $buyingArea.find('.date-range-field-end .date').triggerHandler('change');
          }
        });
      },
      [buyingAreaName, discount, startDate, endDate],
      function () {

      });
  }

  this.changeTargetRevenue = function(data){
    return browser
      .waitForElementVisible('.discount-mode-switcher')
      .click('.discount-mode-switcher')
      .waitForElementVisible('#tacticalDiscountAmount')
      .clearValue('#tacticalDiscountAmount')
      .setValueWithChangeEvent('#tacticalDiscountAmount', data.targetRevenue)
  }
  // Returns the user to the Option Details screen
  this.checkBarterBuyingAreaFields = function(data){
    return browser
      .waitForElementVisible('a.view-all-products')
      .waitForElementPresent('#breadCrumbs li:nth-child(3) a.breadcrumb-title-container')
      //.waitForElementPresent('#breadCrumbs')
      .click('#breadCrumbs li:nth-child(3) a.breadcrumb-title-container')
      .pause(5000)
      .waitForElementVisible('#selectedBuyingAreas')

      // Capital Manchester - barter cash and trade should be present
      .moveToElement('#selectedBuyingAreas > li:nth-child(1)', 10, 10, function() {
        browser.click('#selectedBuyingAreas > li:nth-child(1) > div.area-name-container > button.button-toggle-details')
          .verify.elementPresent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-cash > input')
          .verify.elementPresent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-trade > input');
      })

      // Smooth Radio North West (National Only)
      .moveToElement('#selectedBuyingAreas > li:nth-child(3)', 10, 10, function() {
        browser.click('#selectedBuyingAreas > li:nth-child(3) > div.area-name-container > button.button-toggle-details')
          .verify.elementPresent('#selectedBuyingAreas > li:nth-child(3) > div.barter-values > label.barter-cash > input')
          .verify.elementPresent('#selectedBuyingAreas > li:nth-child(3) > div.barter-values > label.barter-trade > input')
          .expect.element('#selectedBuyingAreas > li:nth-child(3) > div.barter-values > label.barter-trade').to.have.css('display').which.equals('none')
      })
  }

  this.checkBarterCashAndTrade100Percent = function() {
    return browser
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-cash > input', 50)
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-trade > input', 49)
      .click('#buttonSaveAndContinueSP')
      .pause(2000)
      .waitForElementVisible('#selectedBuyingAreas > li:nth-child(1) > div:nth-child(3) > div > ul > li > span')
      .getText('#selectedBuyingAreas > li:nth-child(1) > div:nth-child(3) > div > ul > li > span', function(textResponse) {
        browser.verify.equal('Barter trade and cash total does not equal 100%', textResponse.value); 
        console.log(textResponse);
      })
  }

  this.checkBarterCashOnlyDealLessThan100PercentWarning = function() {
    this.setBarterCashTo90PercentOnThirdBA();
      return browser
        .waitForElementVisible('#selectedBuyingAreas > li:nth-child(3) > div:nth-child(3) > div > ul > li > span')
        .pause(2000)
        .getText('#selectedBuyingAreas > li:nth-child(3) > div:nth-child(3) > div > ul > li > span', function(textResponse) {
          browser.verify.equal('Warning: Barter cash only deal is less than 100%', textResponse.value); 
          console.log(textResponse);
      })
  }

  this.checkBarterDealCannotBeTradeOnlyWarning = function() {
    return browser
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-cash > input', 0)
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-trade > input', 100)
      .click('#buttonSaveAndContinueSP')
      .pause(2000)
      .waitForElementVisible('#selectedBuyingAreas > li:nth-child(1) > div:nth-child(3)')
      .getText('#selectedBuyingAreas > li:nth-child(1) > div:nth-child(3) > div > ul > li > span', function(textResponse) {
          console.log(textResponse);
          browser.verify.equal('Barter deal cannot be trade only', textResponse.value); 
          }) 
  }

  this.setValidBarterValuesForFirstBAOnly = function() {
    // Capital Manchester
    return browser
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-cash > input', 50)
      .pause(1000)
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(1) > div.barter-values > label.barter-trade > input', 50)
      .pause(1000)
      //.click('#buttonSaveAndContinueSP')
      .click('#buttonSaveSP')
      .pause(3000)
  }

  this.setValidBarterValuesForSecondBAOnly = function() {
    // Capital Yorkshire
    return browser
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(2) > div.barter-values > label.barter-cash > input', 18)
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(2) > div.barter-values > label.barter-trade > input', 82)
      .pause(500)
      .click('#buttonSaveSP')
      .pause(2000)
  }

  this.setBarterCashValue = function(buyingAreaPosition, percentageValue) {
    return browser
      .moveToElement('#selectedBuyingAreas > li:nth-child(' + buyingAreaPosition + ')', 10, 10, function() {
        browser.click('#selectedBuyingAreas > li:nth-child(' + buyingAreaPosition + ') > div.area-name-container > button.button-toggle-details')
      .verify.elementPresent('#selectedBuyingAreas > li:nth-child(' + buyingAreaPosition + ') > div.barter-values > label.barter-cash > input')
      .setValueWithChangeEvent('#selectedBuyingAreas > li:nth-child(' + buyingAreaPosition + ') > div.barter-values > label.barter-cash > input', percentageValue)
      });
  }

  this.setBarterCashTo90PercentOnThirdBA = function() {
    // Smooth Radio North West (National Only)    
    this.setBarterCashValue(3, 90);
        console.log('Barter Cash set to 90%');
    return browser
    .click('#buttonSaveSP')
    .pause(1000)   
  }

  this.setBarterCashTo100PercentOnThirdBA = function() {
    // Smooth Radio North West (National Only)    
    this.setBarterCashValue(3, 100);
        console.log('Barter Cash set to 100%');
    return browser
    .click('#buttonSaveSP')
    .pause(1000)
    
  }

};