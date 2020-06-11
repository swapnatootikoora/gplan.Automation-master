var data = require('../../data/dataProvider');

module.exports = {
  'Create an order with multiple broadcast centre, Weeks + Days + Dayparts, budget + tactical discount. Book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk001Data.catoOrderDetails.nameLocalCps)
      .page.orderPage().enterAgencyDetails(data.orderDetails.local)
      .page.orderPage().enterSalesTeam(data.orderDetails.local)
      .page.orderPage().saveOrderDetails()
      .pause(500)

      //Enter airtime details
      .page.orderPage().createNewAirtimeOption()
      .pause(500)
      .page.catoPage().calculateAndSelectStartDate(data.smk001Data.cato02Details.startIn)
      //.page.catoPage().calculateStartDateFromNextDay(data.smk001Data.cato02Details.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk001Data.cato02Details.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.smk001Data.cato02Details.timeRanges)
      .page.catoPage().selectApplyStartAndEndTimesToAllDays()
      .page.catoPage().addDefaultProductsAndSpotlength()
      //.page.catoPage().addProductAndSpotlength(data.smk001Data.catoDetails.product1)
      
      //Weeks, Days, Dayparts
      .page.catoPage().addMultipleBroadcastCentres()
      .page.catoPage().configureWeekDaysDayparts()
      .page.catoPage().configureWeekOnWeekOff()

      //Discounts/budget
      .page.catoPage().configureBudget(data.smk001Data.cato02Details.budget)
      .page.catoPage().configureTacticalDiscounts(data.smk001Data.cato02Details.tacticalDiscount)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Validations in Plan page
      //.page.planPage().changeProduct('All')
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1() //first week
      .pause(500)
      .page.planPage().checkTotalValue(data.smk001Data.cato02Details.budget)
      //.page.planPage().checkWeekHasSpecificSpots(1, 0) //weekNumber, spots
      .page.planPage().verifyCellIsReadOnly(data.daypart.NHT, data.day.monday)
      .page.planPage().checkSpotDiscount(data.daypart.BRK, data.day.monday, data.smk001Data.cato02Details.tacticalDiscount)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.tuesday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.thursday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.saturday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.NHT)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.MRN)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.DRV)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.EVE)
      .page.planPage().clickNthRow(4) //second week
      .pause(500)
      .page.planPage().checkWeekHasNoSpots()
      .page.planPage().clickNthRow(54) //last week
      .pause(500)
      .page.planPage().checkWeekHasNoSpots()
      .page.planPage().verifyCellIsReadOnly(data.daypart.EVE, data.day.sunday)
      .page.planPage().saveAndContinue()
      .pause(500)
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
  }
};