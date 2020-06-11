var data = require('../../data/dataProvider');

module.exports = {
  'Optimise a complex CATO 2' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st21Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter airtime details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st21Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st21Data.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.st21Data.catoDetails.timeRanges)
      .page.catoPage().selectTargetAudiences(data.st21Data.catoDetails.audiences)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addProductAndSpotlengthTopAndTail(data.st21Data.catoDetails.product1)
      .page.catoPage().addWholeBrandAsBuyingArea()
      .page.catoPage().configureWeekDaysAndTimebands(data.st21Data.catoDetails.planTimebands)
      .page.catoPage().configureBudget(data.st21Data.catoDetails.budget)
      .page.catoPage().configureUpsell(data.st21Data.catoDetails.upsell)
      .page.catoPage().configureTacticalDiscounts(data.st21Data.catoDetails.tacticalDiscount)
      //.page.catoPage().configureABIDiscounts(data.st21Data.catoDetails.abi)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgressOnSave()
      
      .end()
   }
};
