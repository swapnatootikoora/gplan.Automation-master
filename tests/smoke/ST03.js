var data = require('../../data/dataProvider');

module.exports = {
  'Create an order with multiple broadcast centre, Weeks + Days + Dayparts, budget + tactical discount. Book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st03Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter airtime details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st03Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st03Data.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.st03Data.catoDetails.timeRanges)
      .page.catoPage().selectApplyStartAndEndTimesToAllDays()
      .page.catoPage().addProductAndSpotlength(data.st03Data.catoDetails.product1)
      
      //Weeks, Days, Dayparts
      .page.catoPage().addMultipleBroadcastCentres()
      .page.catoPage().configureWeekDaysDayparts()
      .page.catoPage().configureWeekOnWeekOff()

      //Discounts/budget
      .page.catoPage().configureBudget(data.st03Data.catoDetails.budget)
      .page.catoPage().configureTacticalDiscounts(data.st03Data.catoDetails.tacticalDiscount)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Validations in Plan page
      //.page.planPage().changeProduct('All')
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .pause(1000)
      .page.planPage().checkTotalValue(data.st03Data.catoDetails.budget)
      //.page.planPage().checkWeekHasSpecificSpots(1, 0) //weekNumber, spots
      .page.planPage().verifyCellIsReadOnly(data.daypart.NHT, data.day.monday)
      .page.planPage().clickWeek2()
      //.page.planPage().checkSpotDiscount(data.daypart.BRK, data.day.monday, data.st03Data.catoDetails.tacticalDiscount)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.tuesday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.thursday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.saturday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.NHT)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.MRN)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.DRV)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.EVE)
      .page.planPage().clickNthRow(54) //last week
      .pause(1000)
      .page.planPage().verifyCellIsReadOnly(data.daypart.EVE, data.day.sunday)
      .page.planPage().saveAndContinue()
      //.page.analysePage().changeProduct(data.st03Data.catoDetails.product1.product)
      
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
  }
};