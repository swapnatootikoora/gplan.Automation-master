var data = require('../../data/DataProvider');

module.exports = {
  'Book, amend and rebook an order multiple times' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st100Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter spato details
      .page.orderPage().createNewSPAirtimeOption() 
      .page.spatoPage().calculateAndSelectStartDate(data.st100Data.spatoDetails.startIn)
      .page.spatoPage().calculateAndSelectEndDate(data.st100Data.spatoDetails.duration)
      //.page.spatoPage().addDefaultProductsAndSpotlength()
      .page.spatoPage().addProductAndSpotlength(data.st100Data.spatoDetails.product1)
      .page.spatoPage().addSingleRajar()  
      .page.spatoPage().saveAndContinueSp()  
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().clickWeek2()
      .page.planPage().addXSpotsWhereNotOversold(5)
      .page.planPage().saveAndContinue()

      .page.analysePage().changeProduct('BTA - National')

      //.page.header().navigateToOrder()

      .page.analysePage().getOrderNumber(function(orderNumber){

    browser

      //initial booking of the order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)

      //Amendment 1 - update name then book
      .page.orderPage().amendOrder()
      .page.orderPage().enterOrderName(data.st100Data.orderDetails.name)
      .page.orderPage().saveAmendOrderDetails()
      .pause(500)
      .page.orderPage().preBookAmendOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)

      //Amendment 2 - update name then book
      .page.orderPage().amendOrder()
      .page.orderPage().enterOrderName(data.st100Data.orderDetails.name)
      .page.orderPage().saveAmendOrderDetails()
      .pause(500)
      .page.orderPage().preBookAmendOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)

      //Amendment 3 - update name then book
      .page.orderPage().amendOrder()
      .page.orderPage().enterOrderName(data.st100Data.orderDetails.name)
      .page.orderPage().saveAmendOrderDetails()
      .pause(500)
      .page.orderPage().preBookAmendOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)

      //Amendment 4 - update name then book
      .page.orderPage().amendOrder()
      .page.orderPage().enterOrderName(data.st100Data.orderDetails.name)
      .page.orderPage().saveAmendOrderDetails()
      .pause(500)
      .page.orderPage().preBookAmendOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      .end()
      })
  }
};