var data = require('../../data/dataProvider');

//ST07 Create a 1 day order with Direct clients
module.exports = {
  'Create a 1 day Local order with a Direct Client' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order orderDetails
      .page.orderPage().enterOrderName(data.st07aData.orderDetails.name)
      .page.orderPage().enterDirectClientDetails(data.st07aData.orderDetails)
      .page.orderPage().enterSalesTeam(data.st07aData.orderDetails)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewAirtimeOption()

      //Enter airtime details 4 week, start mid day
      //.page.catoPage().calculateStartDate(data.st07aData.catoDetails.startIn)
      .page.catoPage().calculateStartDateFromNextDay(data.st07aData.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st07aData.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.st07aData.catoDetails.timeRanges)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleNonRajar()
      .page.catoPage().configureBuyingAreaDiscounts(data.st07aData.catoDetails.baDiscount)
      .page.catoPage().configureTacticalDiscounts(data.st07aData.catoDetails.tacticalDiscount)
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