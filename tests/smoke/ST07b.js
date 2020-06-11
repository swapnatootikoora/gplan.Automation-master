var data = require('../../data/dataProvider');

//ST07 Create a 1 day order with Direct clients
module.exports = {
  'Create a 1 day National order with a Direct Client' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st07bData.orderDetails.name)
      .page.orderPage().enterDirectClientDetails(data.st07bData.orderDetails)
      .page.orderPage().enterSalesTeam(data.st07bData.orderDetails)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewAirtimeOption()

      //Enter airtime details 4 week, start mid day
      //.page.catoPage().calculateAndSelectStartDate(data.st07bData.catoDetails.startIn)
      .page.catoPage().calculateStartDateFromNextDay(data.st07bData.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st07bData.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleNonRajar()
      .page.catoPage().configureBuyingAreaDiscounts(data.st07bData.catoDetails.baDiscount)
      .page.catoPage().configureTacticalDiscounts(data.st07bData.catoDetails.tacticalDiscount)
      //.page.catoPage().configureABIDiscounts(data.st07bData.catoDetails.abi)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //plan page
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      //.page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.tuesday, 1)
      //.page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.tuesday, 1)
      //.page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.tuesday, 1)
      //.page.planPage().addSpotToPlanningGrid(data.daypart.AFT,data.day.tuesday, 1)
      //.page.planPage().addSpotToPlanningGrid(data.daypart.DRV,data.day.tuesday, 1)
      //.page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.tuesday, 1)
      .page.planPage().saveAndContinue()

      .page.analysePage().changeProduct('Commercial Airtime')

      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
  }
};