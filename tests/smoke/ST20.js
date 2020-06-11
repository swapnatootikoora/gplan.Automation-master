var data = require('../../data/DataProvider');

module.exports = {
  'Optimise a complex CATO 1' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st20Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter cato details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st20Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st20Data.catoDetails.duration)
      //.page.catoPage().addDefaultProductsAndSpotlength()
      //.page.catoPage().addProductAndSpotlength(data.st20Data.catoDetails.product1)
      .page.catoPage().addProductAndSpotlengthTopAndTail(data.st20Data.catoDetails.product1)
      .page.catoPage().addWholeBrandAsBuyingArea()
      //.page.catoPage().addSingleRajar()
      .page.catoPage().configureBudget(data.st20Data.catoDetails.budget)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()
      
      .end()
   }
};
