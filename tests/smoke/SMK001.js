var data = require('../../data/DataProvider');

module.exports = {
  'Create and Book a National Agency Order with a Commercial Airtime Option' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk001Data.catoOrderDetails.nameNational)
      //.page.orderPage().enterAgencyDetails(data.smk001Data.orderDetails)
      //.page.orderPage().enterSalesTeam(data.smk001Data.orderDetails)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewAirtimeOption()

      //Create CATO details
      .page.catoPage().calculateAndSelectStartDate(data.smk001Data.cato01Details.startIn)
      //.page.catoPage().calculateStartDateFromNextDay(data.SMK001Data.catoDetails.startIn)
      //.page.catoPage().startIn52Weeks()
      .page.catoPage().calculateAndSelectEndDate(data.smk001Data.cato01Details.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //View spots on CATO
      .page.planPage().expandAllRows()
      .pause(500)
      /*.page.planPage().clickWeek1()
      .pause(500)
      .page.planPage().clickWeek2()
      .pause(500)
      .page.planPage().clickNthRow(55) // Week 53
      .pause(500) */
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