var data = require('../../data/dataProvider.js');


module.exports = {
  'View Admin Pages' : function (browser) {
   browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.adminPage().goToAdmin(data.url)
      .page.adminPage().goToProducts()
      .page.adminPage().goToBuyingAreas()
      .page.adminPage().goToBuyingAreaGroups()
      .page.adminPage().goToStationGroupPackages()
      .page.adminPage().goToTransmitters()
      .page.adminPage().goToSurveys()
      .page.adminPage().goToPricingContracts()
      .page.adminPage().goToFeatureToggles()
      .page.adminPage().goToDeadlines()
      .page.adminPage().goToImportCSVData()
      .page.adminPage().goToImpactFigures()
      .page.adminPage().goToRevenueExports()
      .page.adminPage().goToOrderAdmin()
      .page.adminPage().goToRegionalRevenueTargets()
      .page.adminPage().goToAdmin(data.url)
      .page.adminPage().goToRegionalRevenueBudgets()
      .page.adminPage().goToAdmin(data.url)
      .page.adminPage().goToGlobalBrands()
      //.page.adminPage().goToAdmin(data.url)
      //.page.adminPage().goToEditDemographics()
      .end()
  }
};

