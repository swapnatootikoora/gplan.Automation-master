var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {


  this.goToAdminPackages = function(url) {
    return browser
    	.url(url + '/#/admin/packages')
      .waitForElementVisible('.table-packages-list-container > p > input')
      .saveScreenshot(generateScreenShotFilePath('Admin Packages'));
  };

  this.clickCreateNewButton = function() {
    return browser
  		.click('#createPackageButton')
      .waitForElementVisible('.a-all-packages')
      .pause(1000)
  };

  this.enterPackageName = function(data) {
    return browser
      .waitForElementPresent('#packageName')
      .setValueWithChangeEvent('#packageName', data)
      .pause(500)
  }

  this.enterPackageDescription = function(data) {
    return browser
      .waitForElementPresent('#description')
      .pause(500)
  		.setRichEditorValue('#description', data)
  }

  this.selectSellBetweenEndDate = function(data) {

    if(data.term==='days'){
        var count = data.count -1;
      }

      if(data.term==='weeks'){
        var count = (data.count * 7) -1;
        var term = 'days'
      }
      browser.waitForElementVisible('#sellBetweenDatesContainer .date-range-field-end .date')
      browser.getValue('#sellBetweenDatesContainer .date-range-field-start .date', function(result) {

        var startDateText = result.value;
        var endDate = moment(startDateText, 'DD/MM/YY').add(count,term);
        var endDateText = endDate.format('DD/MM/YY');

        browser
          .setValueWithChangeEvent('#sellBetweenDatesContainer .date-range-field-end .date', endDateText)
          .pause(500)
          .saveScreenshot(generateScreenShotFilePath('Start and End date selected'))
      });

      return browser;

  }

  this.selectSellBetweenStartDate = function(data) {

    if(data.term==='days'){
      var count = data.count;
    }

    if(data.term==='weeks'){
      var count = (data.count * 7);
      var term = 'days'
    }
    browser.waitForElementVisible('#sellBetweenDatesContainer  .date-range-field-start .date')
    browser.getValue('#sellBetweenDatesContainer  .date-range-field-start .date', function(result) {

      var startDateText = result.value;
      var newStartDate = moment(startDateText, 'DD/MM/YY').add(count,term);
      var newStartDateText = newStartDate.format('DD/MM/YY');

      browser
        .setValueWithChangeEvent('#sellBetweenDatesContainer .date-range-field-start .date', newStartDateText)
        .pause(500)
        .saveScreenshot(generateScreenShotFilePath('Start date selected'))
    });

    return browser;

  }

  this.selectOrderStartBetweenEndDate = function(data) {

    if(data.term==='days'){
        var count = data.count -1;
      }

      if(data.term==='weeks'){
        var count = (data.count * 7) -1;
        var term = 'days'
      }
      browser.waitForElementVisible('#useBetweenDatesContainer .date-range-field-end .date')
      browser.getValue('#useBetweenDatesContainer .date-range-field-start .date', function(result) {

        var startDateText = result.value;
        var endDate = moment(startDateText, 'DD/MM/YY').add(count,term);
        var endDateText = endDate.format('DD/MM/YY');

        browser
          .setValueWithChangeEvent('#useBetweenDatesContainer .date-range-field-end .date', endDateText)
          .saveScreenshot(generateScreenShotFilePath('Start and End date selected'))
      });

      return browser;

  }

  this.clickSave = function(){
  	return browser
  		.click('#savePackageButton')
      .waitForElementNotPresent('#savePackageButton .loading')
      .saveScreenshot(generateScreenShotFilePath('Create New Package with data'));
  };

  this.enterPackageDurationAndTierAndPaymentType = function(data){
  	return browser
      .waitForElementPresent('#packageDuration')
      .clearValue('#packageDuration')
  		.setValueWithChangeEvent('#packageDuration' , data.duration)
  		.selectOption('#product', data.tier)
      .selectOption('.package-client-tier + .package-client-tier #product', data.paymentType)
  }

  this.enterPackageDiscount = function(){
  	browser
      .clearValue('.input-max-discount')
  		.setValueWithChangeEvent('.input-max-discount' , 10)

  	return browser;
  }

  this.enterGplanOrderId = function (orderId) {
    browser
      .clearValue('.input-order-id')
      .setValue('.input-order-id', orderId)

    return browser;
    
  }

  this.clickGetOrder = function() {
    browser
      .waitForElementVisible('#getOrderButton')
      .click('#getOrderButton')
      //.pause(2000)
      .waitForElementNotPresent('#getOrderButton .loading')
      //.pause(2000)
  
    return browser;

  }

  this.selectVersion = function(data){
    return browser
      .waitForElementVisible('#airtimeOptionList')
      .selectOption('#airtimeOptionList', data)
  }

  this.enterCostPerMonthBuyingArea =  function(data){
    return browser
      .waitForElementPresent('.field-container .ba-input')
      .clearValue('.field-container .ba-input')
      .setValueWithChangeEvent('.field-container .ba-input', data)
  }

  this.findPackageByName = function(data) {
    return browser
      .execute(function(packageName) {

        $('#tablePackagesList td.name').each(function (packageName) {

          $packageName = $(packageName);
          if ($packageName.text() === data.title) {

            browser.verify(true,true,"package found")
            
          }
        });
      },
      [packageName],
      function () {

      });
  }

};