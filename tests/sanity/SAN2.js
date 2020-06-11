var data = require('../../data/dataProvider');

module.exports = {
  'Create a SPATO order and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.san2Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewSPAirtimeOption()
      .pause(1000)

      //Enter S&P details
      .page.spatoPage().calculateAndSelectStartDate(data.san2Data.spatoDetails.startIn)
      .page.spatoPage().calculateAndSelectEndDate(data.san2Data.spatoDetails.duration)
      .page.spatoPage().addDefaultProductsAndSpotlength()
      .page.spatoPage().addSingleRajar()
      .page.spatoPage().saveAndContinueSp()

      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().addXSpotsWhereNotOversold(5)
      .page.planPage().checkNotOversoldInLaydownGrid()
      .page.planPage().saveAndContinue()

      .page.analysePage().changeProduct('Advertorial')

      .page.header().navigateToOrder()
      .page.orderPage().preBookOrder()
      .page.orderPage().bookOrder()

      .end()
  }
};