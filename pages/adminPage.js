var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.goToAdmin = function(url) {
    return browser  
      .url(url + '/admin')
        .waitForElementVisible('.m-admin')
        .saveScreenshot(generateScreenShotFilePath('Admin Page'));
  }


  this.goToProducts = function() {
   	browser  
    .click('.generic-admin-nav a:nth-child(2)')
    .waitForElementVisible('#products')
    .saveScreenshot(generateScreenShotFilePath('Products Page'));
        
    return browser;
  }


  this.goToBuyingAreas = function() {
   	browser  
    .click('.generic-admin-nav a:nth-child(3)')
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Buying Areas'));    
    
    return browser;
  }

  this.goToBuyingAreaGroups = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(4)')
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Buying Area Groups'));    
    
    return browser;
  }

   this.goToStationGroupPackages = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(5)')
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Station Group Packages'));    
    
    return browser;
  }

   this.goToTransmitters = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(6)')
    .pause(1000)
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Transmitters'));    
    
    return browser;
  }

    this.goToSurveys = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(7)')
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Surveys'));    
    
    return browser;
  }

    this.goToPricingContracts = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(8)')
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Pricing Contracts'));    
    
    return browser;
   
  }
  this.goToFeatureToggles = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(9)')
    .waitForElementVisible('.readableTable')
    .saveScreenshot(generateScreenShotFilePath('Feature Toggles'));    
    
    return browser;
  }

   this.goToDeadlines = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(10)')
    .waitForElementVisible('.m-admin-deadlines')
    .saveScreenshot(generateScreenShotFilePath('Deadlines'));    
    
    return browser;
  }

  this.goToImportCSVData = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(11)')
    .waitForElementVisible('.m-admin-content')
    .saveScreenshot(generateScreenShotFilePath('Import CSV Data'));    
    
    return browser;
  }

   this.goToImpactFigures = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(12)')
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Impact Figures'));    
    
    return browser;
  }


  this.goToRevenueExports = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(13)')
    .waitForElementVisible('button')
    .saveScreenshot(generateScreenShotFilePath('Revenue Exports'));    
    
    return browser;
  } 

  this.goToOrderAdmin = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(14)')
    .waitForElementVisible('.readableTable')
    .saveScreenshot(generateScreenShotFilePath('Order Admin'));    
    
    return browser;
  }

  this.goToRegionalRevenueTargets = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(15)')
    .waitForElementVisible('.spa-budgets-content')
    .saveScreenshot(generateScreenShotFilePath('Regional Revenue Targets'));    
    
    return browser;
  }

  this.goToRegionalRevenueBudgets = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(16)')
    .waitForElementVisible('.budgets-table')
    .saveScreenshot(generateScreenShotFilePath('Regional Revenue Budgets'));    
    
    return browser;
  }

  this.goToGlobalBrands = function() {
    browser  
    .click('.generic-admin-nav a:nth-child(17)')
    .waitForElementVisible('#entityList')
    .saveScreenshot(generateScreenShotFilePath('Global Brands'));    
    
    return browser;
  }

  this.goToEditDemographics = function() {
    browser  
    .click('.generic-admin-nav:last-child a:nth-child(1)')
    .waitForElementVisible('.readableTable')
    .saveScreenshot(generateScreenShotFilePath('Edit Demographics'));    
    
    return browser;
  }
}
