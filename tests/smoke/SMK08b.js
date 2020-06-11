var data = require('../../data/dataProvider');

module.exports = {
  'Create a Billing Line order and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk08Data.orderDetailsLocal.name)
      .page.orderPage().enterDirectClientDetails(data.smk08Data.orderDetailsDirectLocal) // BRISTOL AIRPORT C1414157
      .page.orderPage().enterSalesTeam(data.smk08Data.orderDetailsDirectLocal) // Local Sales Exec
      .page.orderPage().enterPONumber()
      .page.orderPage().saveOrderDetails()
      .pause(500)
      .page.orderPage().createNewBillingLine()

      //Enter billing line details
      .page.billingLinePage().addBillingLineDetails(data.smk08Data.billingLineDetailsLocal)
      .page.billingLinePage().selectNumberOfMonthsInAdvance(data.smk08Data.billingLineDetailsLocal.monthsAdvance)
      //.page.billingLinePage().selectNumberOfMonthsInAdvance(4)
      .page.billingLinePage().addSingleRajar()
      .page.billingLinePage().addBillingLineRevenue(data.smk08Data.billingLineDetailsLocal)  
      .page.billingLinePage().verifyTotalBillingLineRevenue(data.smk08Data.billingLineDetailsLocal)    
      .page.billingLinePage().saveBillingLine()
      .page.header().navigateToOrder()
      .page.orderPage().billingLineVerifyTotalRevenueInBasket(data.smk08Data.billingLineDetailsLocal)

      //Book order
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)
      .end()
  }
};