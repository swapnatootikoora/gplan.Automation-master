var data = require('../../data/dataProvider');

module.exports = {
  'Create and book order with one airtime, 6 days' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st06Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()

      //Enter airtime details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st06Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st06Data.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.st06Data.catoDetails.timeRanges)
      .page.catoPage().selectApplyStartAndEndTimesToAllDays()
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Validation in Laydown in planning grid
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().verifyWeekHasNoSpotsInSpecificDay(data.day.sunday)
      .page.planPage().verifyWeekHasNoSpotsInSpecificDayPart(data.daypart.EVE)
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT, data.day.monday, 1)
      .page.planPage().clickSaveButton()
      .pause(1000)
      .page.planPage().checkStartTimeBandFixing(data.daypart.NHT, data.day.monday, data.st06Data.catoDetails.timeRanges)
      .page.planPage().checkEndTimeBandFixing(data.daypart.DRV, data.day.saturday, data.st06Data.catoDetails.timeRanges)
      .page.planPage().verifyCellIsReadOnly(data.daypart.EVE, data.day.saturday)
      .page.planPage().verifyDayIsReadOnly(data.day.sunday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.NHT, data.day.saturday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.AFT, data.day.wednesday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.sunday)
      .page.planPage().clickSaveButton()
      .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT, data.day.saturday, 0)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.AFT, data.day.wednesday, 0)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE, data.day.sunday, 0)
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT, data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT, data.day.wednesday, 2)
      //.page.planPage().addSpotToPlanningGrid(data.daypart.EVE, data.day.sunday, 3)
      .page.planPage().clickSaveButton()

      .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT, data.day.monday, 1)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.AFT, data.day.wednesday, 2)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE, data.day.sunday, 0) //6 day plan - should not be a spot here

      .page.planPage().removeAllOversold()
      .page.planPage().clickSaveButton()
      .page.planPage().checkNotOversoldInLaydownGrid()
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