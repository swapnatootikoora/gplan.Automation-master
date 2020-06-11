var data = require('../../data/DataProvider');

module.exports = {
  'Create and book agency order with CATO' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk01Data.catoorderDetails.name)
      //.page.orderPage().enterAgencyDetails(data.smk01Data.orderDetails)
      //.page.orderPage().enterSalesTeam(data.smk01Data.orderDetails)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewAirtimeOption()

      //Create CATO details
      .page.catoPage().calculateAndSelectStartDate(data.smk01Data.catoDetails.startIn)
      //.page.catoPage().calculateStartDateFromNextDay(data.smk01Data.catoDetails.startIn)
      //.page.catoPage().startIn52Weeks()
      .page.catoPage().calculateAndSelectEndDate(data.smk01Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //View spots on CATO
      .page.planPage().expandAllRows()
      .pause(500)
      .page.planPage().clickWeek1()
      .pause(500)
      .page.planPage().clickWeek2()
      .pause(500)
      .page.planPage().clickNthRow(55) // Week 53
      .pause(500)
      .page.planPage().saveAndContinue()
      .pause(500)

      .page.analysePage().verifyAnalyseFeaturesAvailable()

      //Book CATO order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      //.pause(500)
      //.page.orderPage().bookOrder()

      .end()
    }
};