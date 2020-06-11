var data = require('../../data/dataProvider');

module.exports = {
  'Create and book order with one airtime, checking ABI discount, time band fixing, upsell. Book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st04Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter airtime details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st04Data.catoDetails.startIn)
      //.page.catoPage().calculateStartDateFromNextDay(data.st04Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st04Data.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.st04Data.catoDetails.timeRanges)
      .page.catoPage().addProductAndSpotlengthTopAndTail(data.st04Data.catoDetails.product1)
      .page.catoPage().addWholeBrandAsBuyingArea()
      .page.catoPage().configureWeekDaysAndTimebands(data.st04Data.catoDetails.planTimebands)
      //.page.catoPage().configureABIDiscounts(data.st04Data.catoDetails.abi)
      .page.catoPage().configureUpsell(data.st04Data.catoDetails.upsell)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgressOnSave()

      //Validations in Airtime page
      //.page.catoPage().verifyTopMiddleTail(data.st04Data.catoDetails.product1)
      .page.catoPage().verifySpotLengthDurationIsTopMiddleTailSum(data.st04Data.catoDetails.product1)
      .page.catoPage().waitForPlanPageToBeVisible()

      //Validations in Plan page
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().checkTotalValue(data.st04Data.catoDetails.upsell)
      //.page.planPage().checkSpotDiscount(data.daypart.MRN, data.day.monday, data.st04Data.catoDetails.abi.discount)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.tuesday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.thursday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.saturday)
      .page.planPage().verifySpotsNotOutsideTimeband(data.day.wednesday, data.daypart.NHT, data.daypart.EVE)
      .page.planPage().checkStartTimeBandFixing(data.daypart.BRK, data.day.sunday, data.st04Data.catoDetails.planTimebands)
      .page.planPage().clickWeek2()
      .page.planPage().checkEndTimeBandFixing(data.daypart.EVE, data.day.sunday, data.st04Data.catoDetails.timeRanges)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.sunday)
      .page.planPage().saveAndContinue()
      .page.analysePage().changeProduct(data.st04Data.catoDetails.product1.product)

      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
  }
}
