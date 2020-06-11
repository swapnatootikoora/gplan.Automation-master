var data = require('../../data/DataProvider');

module.exports = {
  'Create and book agency order with SPATO' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk01Data.spatoorderDetails.name)
      //.page.orderPage().enterAgencyDetails(data.smk01Data.orderDetails)
      //.page.orderPage().enterSalesTeam(data.smk01Data.orderDetails)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails() 

      //Enter SPATO details
      .page.orderPage().createNewSPAirtimeOption() 
      //.page.spatoPage().calculateAndSelectStartDate(data.smk01Data.spatoDetails.startIn) // Calculate Start Date from default of next Monday
      .page.spatoPage().calculateStartDateFromNextDay(data.smk01Data.spatoDetails.startIn) // Calculate Start Date from next day
      .page.spatoPage().calculateAndSelectEndDate(data.smk01Data.spatoDetails.duration) // Calculate End Date from Start Date
      .page.spatoPage().addDefaultProductsAndSpotlength()
      .page.spatoPage().addSingleRajar()
      .page.spatoPage().saveAndContinueSp()  

      //Add spots to SPATO
      //Add 1 spot in each day part for Sunday (first week of all plans will contain a Sunday)
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.DRV,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.sunday, 1)
      .page.planPage().clickSaveButton()
      .pause(1000)
      
      //.page.analysePage().changeProduct('Advertorial')

      //Book SPATO order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      //.pause(500)
      //.page.orderPage().bookOrder()

      .end()
  }
};