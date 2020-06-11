var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

  this.enterOrderName = function(name) {
    browser
      .waitForElementPresent('.page-footer-spa .build-version:last-child')
      .clearValue('#orderName')
      .pause(1500)
      .getAttribute('.page-footer-spa .build-version:last-child', 'title', function(gPlanBuild) {
          var now = new Date();
          var wordsOfBuildText = gPlanBuild.value.split(' ');
          var partsOfBuildNumber = wordsOfBuildText[3].split('.');
          var orderName = partsOfBuildNumber[1] + '.' + partsOfBuildNumber[2] + ' - ' + name + ' ' + moment().format('DD/MM HH:mm');
          browser
            .setValue('#orderName', orderName)
            .pause(1500)
    });
      return browser;
  }

  this.packageOptionEnterOrderName = function(packageOptionName) {
    browser
      .waitForElementPresent('.page-footer-spa .build-version:last-child')
      .pause(2000)
      .waitForElementVisible('.page-footer-spa .build-version:last-child')
      .getAttribute('.page-footer-spa .build-version:last-child', 'title', function(gPlanBuild) {
          var now = new Date();
          var wordsOfBuildText = gPlanBuild.value.split(' ');
          var partsOfBuildNumber = wordsOfBuildText[3].split('.');
          var orderName = partsOfBuildNumber[1] + '.' + partsOfBuildNumber[2] + ' - ' + packageOptionName + ' ' + moment().format('DD/MM HH:mm');

          browser
            .setValue('#orderName', orderName)
    });
      return browser;
  }

  this.enterAgencyDetails = function(data) {
    browser
      .setValue('#agency-search', [data.agencySearch, browser.Keys.ENTER])
      .pause(500)
      .waitForElementPresent('.search-results-table')
      .waitForElementPresent('.search-results-container > tr')
      .selectTableRow('#agency_popup .search-results-container', data.agencySearchResult)
      .pause(500)
      .waitForElementVisible('#clientSelect option:not([value=""])')
      .selectOption('#clientSelect', data.client)
      .pause(500)
      .waitForElementVisible('#brandSelect option:not([value=""])')
      .selectOption('#brandSelect', data.brand)
      .pause(500)
      .waitForElementVisible('#productSelect option:not([value=""])')
      .selectOption('#productSelect', data.product)
      .pause(500)

    return browser;
  }

  this.enterDirectClientDetails = function(data) {
    browser
      .click('input[value="2"]')
      .waitForElementVisible('#client-search')
      .setValue('#client-search', [data.clientSearch, browser.Keys.ENTER])
      .waitForElementPresent('.search-results-table')
      .waitForElementPresent('.search-results-container > tr')
      .selectTableRow('#client_popup .search-results-container', data.clientSearchResult)
      .waitForElementVisible('#brandSelect option:not([value=""])')
      .selectOption('#brandSelect', data.brand)
      .waitForElementVisible('#productSelect option:not([value=""])')
      .selectOption('#productSelect', data.product)

    return browser;
  }
  
  this.enterBarterAgencyDetails = function(data) {
    browser
      .click('input[value="3"]')
      .waitForElementVisible('#agency-search')
      .setValue('#agency-search', [data.agencySearch, browser.Keys.ENTER])
      .waitForElementPresent('.search-results-table')
      .waitForElementPresent('.search-results-container > tr')
      .selectTableRow('#agency_popup .search-results-container', data.agencySearchResult)
      .waitForElementVisible('#clientSelect option:not([value=""])')
      .selectOption('#clientSelect', data.client)
      .waitForElementVisible('#brandSelect option:not([value=""])')
      .selectOption('#brandSelect', data.brand)
      .waitForElementVisible('#productSelect option:not([value=""])')
      .selectOption('#productSelect', data.product)

    return browser;
  }

  this.enterSalesTeam = function(data) {
    browser
      .selectOption('#contactSelect', data.contact)
      .selectOption('#salesExecutiveSelect', data.salesExec)
      .selectOption('#plannerSelect', data.planner)
      .saveScreenshot(generateScreenShotFilePath('Order Details'))

    return browser;
  }

  this.enterPONumber = function(poNumber) {
    var poNumber = "PO" + moment().format('DDMMHHmm');
    browser.setValueWithChangeEvent('#poNumber', poNumber)
    return browser;
  }
  
  this.saveOrderDetails = function() {
    browser
      .waitForElementVisible('#saveOrderButtonTop')
      .click('#saveOrderButtonTop')
      .waitForElementVisible('#headerStatus.order-status.is-proposed')
      .waitForElementVisible('.options-actions-container .spa-split-button-main')
      .saveScreenshot(generateScreenShotFilePath('Order Created'))

    return browser;
  }

  this.saveAmendOrderDetails = function() {
    browser
      .click('#saveOrderButtonTop')
      .pause(1500)
      .waitForElementVisible('.order-status.is-amending')
      .waitForElementVisible('#saveOrderButtonTop')
      .waitForElementVisible('.options-actions-container .spa-split-button-main')
      .saveScreenshot(generateScreenShotFilePath('Order Amended'))

    return browser;
  }

  this.createNewAirtimeOption = function() {
    return browser
      .waitForElementPresent('#addNewOptionToOrder')
      .waitForElementVisible('#addNewOptionToOrder')
      .click('#addNewOptionToOrder .spa-split-button-main')
      .waitForElementVisible('#spairtimeOptionDates .date-range-field-start .date')
      .saveScreenshot(generateScreenShotFilePath('Airtime option Details'))
  }

  this.createNewBillingLine = function() {
    return browser
      .waitForElementPresent('#addNewOptionToOrder')
      .waitForElementVisible('#addNewOptionToOrder')
      .pause(500)
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .pause(1000)
      .click('.spa-split-button-menu-item:nth-child(9) .spa-split-button-menu-action')
      .waitForElementVisible('.billing-line-details', 50000)
      .pause(1000)
      .saveScreenshot(generateScreenShotFilePath('Billing line Details'))
  }

  this.createNewDaxOption = function() {
    return browser
      .waitForElementVisible('#addNewOptionToOrder')
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .click('.spa-split-button-menu-item:nth-child(12) .spa-split-button-menu-action')
      .waitForElementVisible('.dax-option-page')
      .saveScreenshot(generateScreenShotFilePath('DAX Details'))
  }
  this.createNewDigitalOption = function() {
    return browser
      .waitForElementVisible('#addNewOptionToOrder')
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .click('.spa-split-button-menu-item:nth-child(13) .spa-split-button-menu-action')
      .waitForElementVisible('.dax-option-page.digital-option-page')
      .saveScreenshot(generateScreenShotFilePath('Digital Option Details'))
  }

  this.createNewBT40Option = function() {
    return browser
      .waitForElementVisible('#addNewOptionToOrder')
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .click('.spa-split-button-menu-item:nth-child(10) .spa-split-button-menu-action')
      .waitForElementVisible('.big-top-forty')
      .saveScreenshot(generateScreenShotFilePath('BT40 Details'))
  }

  this.createNewPackageOption = function() {
    return browser
      .waitForElementVisible('#addNewOptionToOrder .spa-split-button-sub')
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .waitForElementVisible('.spa-split-button-menu .spa-split-button-menu-item:nth-child(8) button.spa-split-button-menu-action')
      .click('.spa-split-button-menu .spa-split-button-menu-item:nth-child(8) button.spa-split-button-menu-action')
      .waitForElementVisible('.apply-package-page')
      .saveScreenshot(generateScreenShotFilePath('Package option page'))
  }

  this.createNewSPAirtimeOption = function() {
    return browser
      .waitForElementVisible('#addNewOptionToOrder')
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .click('.spa-split-button-menu-item:nth-child(5) .spa-split-button-menu-action')
      .waitForElementPresent('.sp-ato-heading')
      .saveScreenshot(generateScreenShotFilePath('SAndP Airtime option page'))
  }

  this.createNewSoniqOption = function() {
    return browser
      .waitForElementVisible('#addNewOptionToOrder')
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .click('.spa-split-button-menu-item:nth-child(14) .spa-split-button-menu-action')
      .waitForElementPresent('.sp-ato-heading')
      .saveScreenshot(generateScreenShotFilePath('Soniq option page'))
  }

  this.createNewNewslinkOption = function() {
    return browser
      .waitForElementVisible('#addNewOptionToOrder')
      .click('#addNewOptionToOrder .spa-split-button-sub')
      .click('.spa-split-button-menu-item:nth-child(11) .spa-split-button-menu-action')
      .useXpath()
      .waitForElementPresent("//div[@data-view='views/NewslinkAirtimeOption/NewslinkPage']")
      .useCss()
      .saveScreenshot(generateScreenShotFilePath('Newslink option page'))
  }

  this.preBookOrder = function() {  
    return browser
      .url(function(url){
        browser.url(url);
      })
      //.waitForElementPresent('#bookOrderMenu .spa-split-button-main')
      .waitForElementVisible('#bookOrderMenu .spa-split-button-main')
      //.pause(5000)
      .click('#bookOrderMenu .spa-split-button-main')
      .pause(2000)
      .waitForElementVisible('#bookBasketDialog')
      .waitForElementNotVisible('#bookBasketButton .loader-container', 200000)
      .pause(2000)
      .saveScreenshot(generateScreenShotFilePath('Order prebook'))
  }

  this.preBookAmendOrder = function() {  
    return browser
      .url(function(url){
        browser.url(url);
      })
      .waitForElementPresent('#bookOrderMenu .spa-split-button-main')
      .waitForElementVisible('#bookOrderMenu .spa-split-button-main')
      .click('#bookOrderMenu .spa-split-button-main')
      .pause(2000)
      .waitForElementVisible('#bookBasketDialog')
      .waitForElementNotVisible('#bookBasketButton .loader-container', 200000)
      .pause(2000)
      .saveScreenshot(generateScreenShotFilePath('Order prebook'))
  }

  this.amendOrder = function() {  
    return browser
      .url(function(url){
        browser.url(url);
      })
      .waitForElementPresent('#bookOrderMenu .spa-split-button-main')
      .pause(1000)
      .click('#bookOrderMenu .spa-split-button-main')
      .waitForElementVisible('#infoDialog')
      .pause(1000)
      .click('#infoDialog .ok-button')
      .waitForElementNotVisible('#infoDialog')
      .waitForElementVisible('.order-status.is-amending')
      .pause(1000)
      .saveScreenshot(generateScreenShotFilePath('Order amending'))
  }

  this.bookOrder = function() {
    return browser
      .waitForElementPresent('#bookBasketButton')
      .click('#bookBasketButton')
      .waitForElementNotPresent('#bookBasketDialog', 200000)
      .waitForElementVisible('.order-status.is-booked')
      .pause(2000)
      .saveScreenshot(generateScreenShotFilePath('Order booked'))
  }

  this.analyseBasket = function() {  
    return browser
      .url(function(url){
        browser.url(url);
      })
      .waitForElementPresent('#bookOrderMenu .spa-split-button-sub')
      .click('#bookOrderMenu .spa-split-button-sub')
      .pause(1000)
      .waitForElementVisible('#bookOrderMenu .spa-split-button-menu')
      .click('#bookOrderMenu .spa-split-button-menu li:nth-child(3) button.spa-split-button-menu-action')
      .pause(1000)
      .waitForElementPresent('.m-analyse-revenue-heading')
      .saveScreenshot(generateScreenShotFilePath('Analyse Basket'))
  }

  this.getOrderNumber = function(cb) {
    browser.getText('.spa-nav-proposal-info span.spa-nav-proposal-text:first-child', function (textResponse) {
      if (!textResponse.value) { return ''; }
        var orderNumber = new RegExp(/\d+/g).exec(textResponse.value)[0]
        cb(orderNumber);
      });
    return browser;
  }

  this.getNetRevenue = function(cb) {
    browser.getText('.spa-basket-content table > tr:last-child td:nth-child(8)', function (textResponse) {
      var revenue = parseFloat(textResponse.value.substring(1), 10);
      // 85% is net revenue, 15% commision
      cb(Math.ceil((revenue * 0.85) * 100) / 100);
      return browser;
    });
  }

  this.billingLineVerifyTotalRevenueInBasket = function(data) {
    return browser
    .pause(5000)
    .getText('.totals-row :nth-child(8)', function(textResponse) {
        browser.verify.equal((data.value1+data.value2+data.value3+data.value4+data.value5+data.value6), Number((textResponse.value).replace(/[^0-9\.]+/g,"")), 'Basket total is correct'); 
        console.log(textResponse);
        }) 
  }

  this.addInvoiceSchedule = function() {
    return browser
      .waitForElementVisible('#openBasket tr:nth-child(2) .spa-split-button-sub', 50000)
      .pause(1000)
      //.waitForElementVisible('#openBasket')
      .click('#openBasket tr:nth-child(2) .spa-split-button-sub')
      .waitForElementVisible('#openBasket tr:nth-child(2) .spa-split-button-menu .spa-split-button-sub-menu', 50000)
      .pause(2000)
      .click('#openBasket tr:nth-child(2) .spa-split-button-menu .spa-split-button-sub-menu li:nth-child(8) button.spa-split-button-menu-action')
      //.click('#openBasket .spa-split-button-menu .spa-split-button-sub-menu li:nth-child(7) button.spa-split-button-menu-action')
      .waitForElementVisible('.schedule-type')
      .pause(2000)
      .saveScreenshot(generateScreenShotFilePath('Order Invoice schedule')) 
  }

  this.daxSubmitForApproval = function () {
    return browser 
      .waitForElementVisible('#openBasket tr:nth-child(2) .spa-split-button-sub')
      .click('#openBasket tr:nth-child(2) .spa-split-button-sub')
      .waitForElementVisible('#openBasket tr:nth-child(2) .spa-split-button-menu')
      .click('#openBasket tr:nth-child(2) .spa-split-button-menu .spa-split-button-sub-menu li:nth-child(5) button.spa-split-button-menu-action')
      .waitForElementVisible('.is-pending')
  }

  this.daxVerifyImpressions = function(rev, cpm){
    return browser
      .waitForElementVisible('.spa-basket-content .impressions')
      .getText('.spa-basket-content .impressions', function(textResponse) {
        browser.verify.equal(((rev*1000)/cpm), Number((textResponse.value).replace(/,/g, ''), 10), 'Impressions correct'); 
        console.log(textResponse);
      }) 
  }

  this.goToFirstOptionDetails = function() {
    return browser
      .waitForElementPresent('#openBasket .option-link:first-child')
      .click('#openBasket .option-link:first-child')
      .url(function(url){
        browser.url(url);
      })
  }

  this.airtimeAddNthTypeNthOptionToOrder = function(nthTable, nthRow) {
    return browser
      .pause(2000)
      .url(function(url){
        browser.url(url);
      })
      .waitForElementVisible('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-sub')
      .click('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-sub')
      .pause(2000)
      .waitForElementVisible('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-menu')
      .click('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-menu li.spa-split-button-menu-item:nth-child(5) .spa-split-button-sub-menu .spa-split-button-menu-item:first-child .spa-split-button-menu-action')
      .pause(2000)
      .waitForElementNotVisible('.loader-container')
  }

  this.billingLineAddNthTypeNthOptionToOrder = function(nthTable, nthRow) {
    return browser
      .pause(2000)
      .url(function(url){
        browser.url(url);
      })
      .waitForElementVisible('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-sub')
      .pause(2000)
      .click('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-sub')
      .waitForElementVisible('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-menu')
      .pause(2000)
      .click('#orderOptionsContainer .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-menu li.spa-split-button-menu-item:nth-child(5) .spa-split-button-sub-menu .spa-split-button-menu-item:nth-child(2) .spa-split-button-menu-action')
      .waitForElementNotVisible('.loader-container')
  }

  this.cancelNthTypeNthOptionFromBasket = function(nthTable, nthRow) {
    return browser
      .pause(5000)
      .url(function(url){
        browser.url(url);
      })
      .waitForElementVisible('#openBasket .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-main')
      .click('#openBasket .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .spa-split-button-main')
      .waitForElementNotVisible('.loader-container')
      .waitForElementVisible('#openBasket .airtime-options-summary-grid tbody:nth-child('+nthTable+') tr:nth-child('+(nthRow+1)+') .is-cancelled')
  }

  this.checkPreBookErrorBarterDealValuesRequired = function() {
    return browser
      .waitForElementVisible('#bookBasketDialogStatusMessages > div > ul > li:nth-child(1) > span')
      .pause(2000)
      .getText('#bookBasketDialogStatusMessages > div > ul > li:nth-child(1) > span', function(textResponse) {
              console.log(textResponse);
              browser.verify.equal('Barter Deal values are required for all buying areas to book order', textResponse.value); 
      }) 
  }

  this.closeBookingRequestAndReturnToFirstOption = function() {
    return browser
      .waitForElementVisible('#bookBasketDialog > header > span')
      //.pause(2000)
      .click('#bookBasketDialog > header > span') //dialog close button
      .pause(500)
      //.waitForElementNotVisible('#bookBasketDialog > header > span')
      .waitForElementVisible('#openBasket > div > div.summary-grid-container > table > tbody > tr.option-row > td.option-name > a')
      .click('#openBasket > div > div.summary-grid-container > table > tbody > tr.option-row > td.option-name > a')
      .pause(2000)
      .waitForElementNotVisible('#openBasket > div > div.summary-grid-container > table > tbody > tr.option-row > td.option-name > a')
  }

};
