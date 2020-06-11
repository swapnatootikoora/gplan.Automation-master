var data = require('../../data/DataProvider');

module.exports = {
  'Create a CATO, SPATO & Billing line order, apply target revenue to CATO and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st09Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter cato details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st09Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st09Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().configureBudget(data.st09Data.catoDetails.budget)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()
      .page.planPage().saveAndContinue()
      .page.analysePage().changeProduct('Commercial Airtime')

      .page.analysePage().getOrderNumber(function(orderNumber){

    browser
      .page.ordersPage().goToOrdersPage(data.url)
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)

      //Enter Spato details
      .page.orderPage().createNewSPAirtimeOption()
      .page.spatoPage().calculateAndSelectStartDate(data.st09Data.spatoDetails.startIn)
      .page.spatoPage().calculateAndSelectEndDate(data.st09Data.spatoDetails.duration)
      //.page.spatoPage().addDefaultProductsAndSpotlength()
      .page.spatoPage().addProductAndSpotlength(data.st09Data.spatoDetails.product1)
      .page.spatoPage().addSingleRajar()  
      .page.spatoPage().saveAndContinueSp()  

      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().addXSpotsWhereNotOversold(5)
      .page.planPage().checkNotOversoldInLaydownGrid()
      .page.planPage().saveAndContinue()

      //.page.analysePage().changeProduct('BTA - National')
      .page.analysePage().changeProduct(data.st09Data.spatoDetails.product1)

      .page.ordersPage().goToOrdersPage(data.url)     
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)     

      //Enter Billing line details
      .page.orderPage().createNewBillingLine()
      .page.billingLinePage().addBillingLineDetails(data.st09Data.billingLineDetails)
      .page.billingLinePage().selectNumberOfMonthsInAdvance(data.st09Data.billingLineDetails.monthsAdvance)
      .page.billingLinePage().addSingleRajar(data.st09Data.billingLineDetails)
      .page.billingLinePage().addBillingLineRevenue(data.st09Data.billingLineDetails)  
      .page.billingLinePage().verifyTotalBillingLineRevenue(data.st09Data.billingLineDetails)    
      .page.billingLinePage().saveBillingLine()

      //Update Target Revenue
      .page.ordersPage().goToOrdersPage(data.url)
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)
      .page.orderPage().goToFirstOptionDetails()
      .page.catoPage().changeTargetRevenue(data.st09Data.catoDetails)
      .page.catoPage().saveAndContinueAirtime()
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().saveAndContinue()
      .page.analysePage().verifyTargetRevenue(data.st09Data.catoDetails)
      .page.header().navigateToOrder()

      .page.ordersPage().goToOrdersPage(data.url)     
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)     

      .page.orderPage().airtimeAddNthTypeNthOptionToOrder(2,1)
      .page.orderPage().billingLineAddNthTypeNthOptionToOrder(3,1)

      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
      })
   }
};