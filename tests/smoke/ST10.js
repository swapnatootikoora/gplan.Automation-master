var data = require('../../data/DataProvider');

module.exports = {
  'Create and book S&P, Cato & BillingLine. Manual(Buying area discount + remove/delete product + book)' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter spato details
      .page.orderPage().enterOrderName(data.st10Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter spato details
      .page.orderPage().createNewSPAirtimeOption() 
      .page.spatoPage().calculateAndSelectStartDate(data.st10Data.spatoDetails.startIn)
      .page.spatoPage().calculateAndSelectEndDate(data.st10Data.spatoDetails.duration)
      //.page.spatoPage().addDefaultProductsAndSpotlength()
      .page.spatoPage().addProductAndSpotlength(data.st10Data.spatoDetails.product1) 
      .page.spatoPage().addSingleRajar()  
      .page.spatoPage().configureBuyingAreaDiscounts(data.st10Data.spatoDetails.baDiscount)
      .page.spatoPage().saveAndContinueSp()  
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      //.page.planPage().checkSpotDiscount(data.daypart.BRK, data.day.monday, data.st10Data.spatoDetails.baDiscount)
      .page.planPage().clickWeek2()
      .page.planPage().addXSpotsWhereNotOversold(5)
      .page.planPage().checkNotOversoldInLaydownGrid()
      .page.planPage().saveAndContinue()

      //Change Product
      .page.analysePage().changeProduct('BTA - National')

      .page.header().navigateToOrder()
      .page.analysePage().getOrderNumber(function(orderNumber){
       
       browser
      .page.ordersPage().goToOrdersPage(data.url)
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)

      //Enter cato details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st10Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st10Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()
      .page.planPage().saveAndContinue()
      .page.analysePage().changeProduct('Commercial Airtime')

      .page.ordersPage().goToOrdersPage(data.url)     
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)     

      //Enter Billing line details
      .page.orderPage().createNewBillingLine()
      .page.billingLinePage().addBillingLineDetails(data.st10Data.billingLineDetails)
      .page.billingLinePage().selectNumberOfMonthsInAdvance(3)
      .page.billingLinePage().addSingleRajar(data.st10Data.billingLineDetails)
      .page.billingLinePage().addBillingLineRevenue(data.st10Data.billingLineDetails)  
      .page.billingLinePage().verifyTotalBillingLineRevenue(data.st10Data.billingLineDetails)    
      .page.billingLinePage().saveBillingLine()

      .page.ordersPage().goToOrdersPage(data.url)     
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)     

      .page.orderPage().airtimeAddNthTypeNthOptionToOrder(1,1)
      .page.orderPage().billingLineAddNthTypeNthOptionToOrder(3,1)

      .page.orderPage().preBookOrder()
      .page.orderPage().bookOrder()
 
      .page.orderPage().amendOrder()

      .page.orderPage().cancelNthTypeNthOptionFromBasket(1,1)

      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()


      .end()
      })
  }
};