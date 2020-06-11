var data = require('../../data/DataProvider');

module.exports = {
  'Create NATIONAL Direct Client CATO Order with Tactical, Buying Area & ABI Discount' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter NATIONAL order details
      .page.orderPage().enterOrderName(data.smk04Data.catoOrderDetails.nameNational)
      .page.orderPage().enterDirectClientDetails(data.smk04Data.orderDetailsNational)
      .page.orderPage().enterSalesTeam(data.smk04Data.orderDetailsNational)
      .page.orderPage().saveOrderDetails() 

      //Create CATO details for NonRajar Buying Area
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.smk04Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk04Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleNonRajar()

      //Set discounts and save
      .page.catoPage().configureBuyingAreaDiscounts(data.smk04Data.catoDetails.baDiscount)
      .page.catoPage().configureTacticalDiscounts(data.smk04Data.catoDetails.tacticalDiscount)
      .page.catoPage().configureBudget(data.smk04Data.catoDetails.budget)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Test required 1 spot in each day part for Monday (default order start day is always Monday)
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT,data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.DRV,data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.monday, 1)
      .page.planPage().clickSaveButton()

      //Get pre & post discount values for each spot (ßdefault order start day is always Monday)
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.NHT,data.day.monday, 'Monday NHT')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.BRK,data.day.monday, 'Monday BRK')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.MRN,data.day.monday, 'Monday MRN')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.AFT,data.day.monday, 'Monday AFT')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.DRV,data.day.monday, 'Monday DRV')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.EVE,data.day.monday, 'Monday EVE')

      .page.planPage().saveAndContinue()

      //Book order
      //.page.analysePage().changeProduct('Commercial Airtime')
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      .end()
    }
};