var data = require('../../data/dataProvider');

module.exports = {
  'Create order with CATO and populate spots with timebands, oversold added/removed. Booked' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details with default plan dates & time band
      .page.orderPage().enterOrderName(data.st01Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.st01Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.st01Data.orderDetails)
      .page.orderPage().enterPONumber(data.st01Data.orderDetails.name)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewAirtimeOption()

      //Enter airtime details
      .page.catoPage().calculateAndSelectStartDate(data.st01Data.catoDetails.startIn)
      //.page.catoPage().calculateStartDateFromNextDay(data.st01Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st01Data.catoDetails.duration)
      .page.catoPage().selectBaseAudiences(data.st01Data.catoDetails.audiences)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().configureWeekDaysTimebandsForAllDays(data.st01Data.catoDetails.planTimebands)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Validation in Laydown in planning grid
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().verifySpotsNotOutsideTimeband()

      .page.planPage().deleteSpotInPlanningGrid(data.daypart.NHT, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.AFT, data.day.wednesday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.sunday)
      .page.planPage().clickSaveButton()
      .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT, data.day.monday, 0)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.AFT, data.day.wednesday, 0)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE, data.day.sunday, 0)
      .page.planPage().checkNotOversoldInLaydownGridSpot(data.daypart.NHT, data.day.monday)
      .page.planPage().checkNotOversoldInLaydownGridSpot(data.daypart.AFT, data.day.wednesday)
      .page.planPage().checkNotOversoldInLaydownGridSpot(data.daypart.EVE, data.day.sunday)

      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT, data.day.monday,1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT, data.day.wednesday,2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE, data.day.sunday,3)
      .page.planPage().clickSaveButton()
      .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT, data.day.monday,1)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.AFT, data.day.wednesday,2)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE, data.day.sunday,3)

      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT, data.day.monday,100)
      .page.planPage().clickSaveButton()
      .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT, data.day.monday,100)
      .page.planPage().clickCheckOverSoldButton()
      
      //.page.planPage().expandAllRows()
      //.page.planPage().clickWeek1WithoutWaitingForLoader()
      .page.planPage().checkOversoldInLaydownGridSpot(data.daypart.NHT, data.day.monday)
      .page.planPage().checkLaydownSpotsAreOversold()
      
      .page.planPage().removeAllOversold()
      .page.planPage().clickSaveButton()     
      .pause(1000)
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
