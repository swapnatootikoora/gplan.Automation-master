var data = require('../../data/DataProvider');

module.exports = {
  'Create and book agency order with SPATO with Live Read' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk01Data.spatoLiveReadOrderDetails.name)
      //.page.orderPage().enterAgencyDetails(data.smk01Data.orderDetails)
      //.page.orderPage().enterSalesTeam(data.smk01Data.orderDetails)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails() 

      //Enter SPATO details
      .page.orderPage().createNewSPAirtimeOption() 
      .page.spatoPage().calculateAndSelectStartDate(data.smk01Data.liveReadDetails.startIn) // Calculate Start Date from default of next Monday
      //.page.spatoPage().calculateStartDateFromNextDay(data.smk01Data.liveReadDetails.startIn) // Calculate Start Date from next day
      .page.spatoPage().calculateAndSelectEndDate(data.smk01Data.liveReadDetails.duration)
      //.page.spatoPage().addDefaultProductsAndSpotlength()
      .page.spatoPage().addProductAndSpotlength(data.smk01Data.liveReadDetails.product1)
      .page.spatoPage().selectSingleRajarBuyingAreaFromBrands()
      //.page.spatoPage().addSingleRajar() 
      .page.spatoPage().saveAndContinueSp()

      //Add spots to SPATO
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .pause(1000)
      //.page.planPage().addXSpotsWhereNotOversold(5)
      .page.planPage().liveReadAddSpotToPlanningGrid(1,2,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(2,3,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(3,4,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(4,5,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(5,6,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(6,7,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(7,8,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(8,7,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(9,6,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(10,5,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(11,4,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(12,3,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(13,2,1)
      .page.planPage().liveReadAddSpotToPlanningGrid(14,1,1)
      .page.planPage().clickSaveButton()
      .pause(1000)

      // Remove invalid Spots
      .page.planPage().removeAllOversoldLiveReads()
      .pause(1000)
      .page.planPage().saveAndContinue()
      .pause(500)

      //Book SPATO order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      //.pause(500)
      //.page.orderPage().bookOrder()

      .end()
  }
};