var data = require('../../data/dataProvider');

module.exports = {
  'Create a CATO order and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.san1Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewAirtimeOption()

      //Enter airtime details with default plan dates & time band
      .page.catoPage().calculateStartDateFromNextDay(data.san1Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.san1Data.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.san1Data.catoDetails.timeRanges)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()
      //.page.catoPage().verifyOpeError()

      .page.header().navigateToOrder()
      .page.orderPage().preBookOrder()
      .page.orderPage().bookOrder()
      .end()
  }
};