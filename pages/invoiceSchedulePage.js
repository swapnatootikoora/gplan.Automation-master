var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.addInvoiceScheduleDetailsWithoutText = function(data) {
    return browser
      .click('input[value="2"]')
      .pause(1000)
	    .waitForElementVisible('.save-button')
	    .saveScreenshot(generateScreenShotFilePath('Invoice Schedule Added'))  
  }

  this.addInvoiceScheduleDetailsWithText = function(data) {
    return browser
      .click('input[value="2"]')
      .pause(1000)
	    .waitForElementVisible('.save-button')
      .setValueWithChangeEvent('#name', data.name)
      .pause(1000)
	    .waitForElementVisible('.save-button')
	    .saveScreenshot(generateScreenShotFilePath('Invoice Schedule Added'))  
  }

  this.clearAndReplaceInvoiceScheduleRevenueSplitWithTotal = function() {
    return browser
      .waitForElementVisible('.revenue-grids-container')
      .saveScreenshot(generateScreenShotFilePath('Invoice Schedule Total Revenues'))

    //This is liable to break as no IDs on invoice schedule page to assist automated tests
      .getText('.revenue-grids-container > tbody > tr > td:last-child tfoot tr:first-child .total-cell span', function(textResponse) {
        browser
        
    //Use the "clear" menu action to clear values from the sole revenue row
	    .waitForElementVisible('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table button.spa-split-button-sub')
	    .click('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table button.spa-split-button-sub')
      .pause(1000)
      .waitForElementVisible('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table .spa-split-button-menu')
	    .click('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table .spa-split-button-menu li:nth-child(1) button.spa-split-button-menu-action')
      .pause(1000)
    
      //Set the first cell of the sole revenue row to be the total value of the order
      .setValueWithChangeEvent('.root-row > td.revenue-cell:first-child  input', textResponse.value)
    }) 

    .saveScreenshot(generateScreenShotFilePath('Invoice Schedule Amended Revenue'))
  }

  this.applyInvoiceScheduleRevenueEqualSpread = function() {
    return browser
    //This is liable to break as no IDs on invoice schedule page to assist automated tests
      .waitForElementVisible('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table button.spa-split-button-sub')
      .click('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table button.spa-split-button-sub')
      .pause(1000)
      .waitForElementVisible('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table .spa-split-button-menu')
      .click('.invoice-schedule-page .revenue-details .revenue-grids-container tr:nth-child(1) td:nth-child(3) .revenue-table .spa-split-button-menu li:nth-child(2) button.spa-split-button-menu-action')
      .pause(1000)
      .saveScreenshot(generateScreenShotFilePath('Invoice Schedule Revenue Spread Equally'))
 }


  this.saveInvoiceScheduleWithoutText = function() {
    return browser
	    .waitForElementVisible('.save-button')
      .click('.save-button')
      .pause(1000)
      .waitForElementVisible('.field-message.is-error')
      .saveScreenshot(generateScreenShotFilePath('Invoice Schedule Without Text Saved'))     
  }

  this.saveInvoiceScheduleWithText = function() {
    return browser
	    .waitForElementVisible('.save-button')
      .click('.save-button')
      .pause(1000)
      .waitForElementVisible('.save-button')
      .saveScreenshot(generateScreenShotFilePath('Invoice Schedule With Text Saved'))     
  }
  
};

