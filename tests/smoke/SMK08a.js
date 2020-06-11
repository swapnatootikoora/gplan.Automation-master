var data = require('../../data/dataProvider');

module.exports = {
  'Create a Billing Line order and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk08Data.orderDetailsNational.name)
      .page.orderPage().enterAgencyDetails(data.smk08Data.orderDetailsAgencyNational) // ARENA MEDIA LIMITED C1290841
      //.page.orderPage().enterAgencyDetails(data.orderDetails.national)
      //.page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.smk08Data.orderDetailsAgencyNational) // National Sales Exec
      .page.orderPage().saveOrderDetails()
      .pause(500)
      .page.orderPage().createNewBillingLine()

      //Enter billing line details
      .page.billingLinePage().addBillingLineDetails(data.smk08Data.billingLineDetailsNational)
      .page.billingLinePage().selectNumberOfMonthsInAdvance(data.smk08Data.billingLineDetailsNational.monthsAdvance)
      //.page.billingLinePage().selectNumberOfMonthsInAdvance(4)
      .page.billingLinePage().addSingleRajar()
      .page.billingLinePage().addBillingLineRevenue(data.smk08Data.billingLineDetailsNational)  
      .page.billingLinePage().verifyTotalBillingLineRevenue(data.smk08Data.billingLineDetailsNational)    
      .page.billingLinePage().saveBillingLine()
      .page.header().navigateToOrder()
      .page.orderPage().billingLineVerifyTotalRevenueInBasket(data.smk08Data.billingLineDetailsNational)

      //Book order
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)
      .end()
  }
};