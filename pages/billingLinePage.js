var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.addBillingLineDetails = function(data) {
    return browser
    .waitForElementVisible('.basic-info .select-container select')
    .selectOption('.basic-info .select-container select', data.product)
    .pause(1000)
    .selectOption('#duration', data.duration)
    .waitForElementNotPresent ('#add-buying-areas-button .loading')
    .pause(1000)
  }

   this.addSingleRajar = function() {
    return browser
      .waitForElementVisible('#add-buying-areas-button .action-text')
      .click('#add-buying-areas-button')
      .pause(1000)
      .waitForElementVisible('.buying-area-selection-dialog')
      .waitForElementVisible('#globalBrandsList')
      .pause(500)
      .click('#globalBrandsList .navigation-item:first-child')
      .pause(1000)
      .waitForElementVisible('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .pause(500)    
      .click('#baListForBrand li.select-item:first-child .select-item-check')
      .pause(1000)
      .waitForElementNotPresent('#baListForBrand li.select-item:first-child .select-item-check:not(:checked)')
      .pause(500)
      .click('#buttonAddSelectedBas')
      .pause(1000)
      //.waitForElementNotVisible('.buying-area-selection-dialog')
      .waitForElementNotPresent('.buying-area-selection-dialog')
      .verify.elementPresent('.revenue-grids-container')
      .saveScreenshot(generateScreenShotFilePath('Billing Line Buying Area'))
  }

  this.addBillingLineRevenue = function(data) {
    return browser
    .waitForElementVisible('.revenue-grids-container')
    .setValueWithChangeEvent('.root-row > td.revenue-cell:first-child  input', data.value1)
    .setValueWithChangeEvent('.root-row > td.revenue-cell:nth-child(2) input', data.value2)
    .setValueWithChangeEvent('.root-row > td.revenue-cell:nth-child(3) input', data.value3)
    .setValueWithChangeEvent('.root-row > td.revenue-cell:nth-child(4) input', data.value4)
    .setValueWithChangeEvent('.root-row > td.revenue-cell:nth-child(5) input', data.value5)
    .setValueWithChangeEvent('.root-row > td.revenue-cell:last-child input', data.value6)
    .saveScreenshot(generateScreenShotFilePath('Billing Line Revenue'))
  }

  this.saveBillingLine = function() {
    return browser
    .waitForElementPresent('#saveBillingLineButton')
    .waitForElementVisible('#saveBillingLineButton')
    .pause(2000)
    .click('#saveBillingLineButton')
    .pause(2000)
    .saveScreenshot(generateScreenShotFilePath('Billing Line Revenue Saved'))     
  }
    
  this.verifyTotalBillingLineRevenue = function(data) {
    return browser
    .saveScreenshot(generateScreenShotFilePath('Billing Line Enter Revenues'))   
    .getText('.revenue-grids-container > tbody > tr > td:last-child tfoot tr:first-child .total-cell span', function(textResponse) {
        browser.verify.equal((data.value1+data.value2+data.value3+data.value4+data.value5+data.value6), Number((textResponse.value).replace(/,/g, ''), 10), 'Revenue row total correct'); 
        console.log(textResponse);
    }) 
 }

   this.selectNumberOfMonthsInAdvance = function(number) {
    return browser
      .waitForElementVisible('#dates')
      .pause(1000)
      .selectOptionByIndex('#dates', number);
    } 
};

