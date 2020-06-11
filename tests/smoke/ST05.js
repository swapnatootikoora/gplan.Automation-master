var data = require('../../data/dataProvider');

module.exports = {
  'Create a CATO with multiple Buying Areas, check tactical discount and Book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st05Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.regional)
      .page.orderPage().enterSalesTeam(data.orderDetails.regional)
      .page.orderPage().saveOrderDetails()

      //Enter airtime details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.st05Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st05Data.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.st05Data.catoDetails.timeRanges)
      .page.catoPage().addProductAndSpotlength(data.st05Data.catoDetails.product1)
      .page.catoPage().addProductAndSpotlength(data.st05Data.catoDetails.product2)
      .page.catoPage().addMultipleRajarBuyingAreas()
      .page.catoPage().configureTacticalDiscounts(data.st05Data.catoDetails.tacticalDiscount)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Plan page
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.monday, 1)
      .page.planPage().clickSaveButton()
      .page.planPage().checkStartTimeBandFixing(data.daypart.BRK, data.day.monday, data.st05Data.catoDetails.timeRanges)
      //.page.planPage().checkSpotDiscount(data.daypart.MRN, data.day.monday, data.st05Data.catoDetails.tacticalDiscount)
      .page.planPage().verifyCellIsReadOnly(data.daypart.NHT, data.day.monday)
      .page.planPage().removeAllOversold()
      .page.planPage().clickSaveButton()
      .page.planPage().checkNotOversoldInLaydownGrid()
      .page.planPage().saveAndContinue()
      .pause(500)
      .page.analysePage().changeProduct(data.st05Data.catoDetails.product1.product)

      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
  }
};