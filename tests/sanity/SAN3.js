var data = require('../../data/dataProvider');

module.exports = {
  'Create a Billing Line order and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.san3Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.local)
      .page.orderPage().enterSalesTeam(data.orderDetails.local)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewBillingLine()

      //Enter billing line details
      .page.billingLinePage().addBillingLineDetails(data.san3Data.billingLineDetails)
      //.page.billingLinePage().selectNumberOfMonthsInAdvance(data.san3Data.billingLineDetails.monthsAdvance)
      .page.billingLinePage().selectNumberOfMonthsInAdvance(4)
      .page.billingLinePage().addSingleRajar()
      .page.billingLinePage().addBillingLineRevenue(data.san3Data.billingLineDetails)  
      .page.billingLinePage().verifyTotalBillingLineRevenue(data.san3Data.billingLineDetails)    
      .page.billingLinePage().saveBillingLine()
      .page.header().navigateToOrder()
      .page.orderPage().billingLineVerifyTotalRevenueInBasket(data.san3Data.billingLineDetails)

      //Book order
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)
      .end()
  }
};