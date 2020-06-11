var data = require('../../data/DataProvider');

module.exports = {
  'Create NATIONAL Direct Client CATO Order with Tactical, Buying Area & ABI Discount' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter NATIONAL order details
      .page.orderPage().enterOrderName(data.smk003Data.catoOrderDetails.nameNational)
      .page.orderPage().enterDirectClientDetails(data.smk003Data.orderDetailsNational)
      .page.orderPage().enterSalesTeam(data.smk003Data.orderDetailsNational)
      .page.orderPage().saveOrderDetails() 

      //Create CATO details for NonRajar Buying Area
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateStartDateFromNextDay(data.smk003Data.nationalCatoDetails.startIn)
      //.page.catoPage().calculateAndSelectStartDate(data.smk003Data.nationalCatoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk003Data.nationalCatoDetails.duration)
      //.page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addProductAndSpotlengthTopAndTail(data.smk003Data.nationalCatoDetails.product1)
      .page.catoPage().addMultipleRajarAndNonRajarBuyingAreas()

      //Set discounts and save
      .page.catoPage().configureBuyingAreaDiscounts(data.smk003Data.nationalCatoDetails.baDiscount)
      .page.catoPage().configureTacticalDiscounts(data.smk003Data.nationalCatoDetails.tacticalDiscount)
      .page.catoPage().configureBudget(data.smk003Data.nationalCatoDetails.budget)
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Test required 1 spot in each day part for Monday (first week must always include a Sunday)
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.DRV,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.sunday, 1)
      .page.planPage().clickSaveButton()

      //Get pre & post discount values for each spot (first week must always include a Sunday)
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.NHT,data.day.sunday, 'Sunday NHT')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.BRK,data.day.sunday, 'Sunday BRK')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.MRN,data.day.sunday, 'Sunday MRN')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.AFT,data.day.sunday, 'Sunday AFT')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.DRV,data.day.sunday, 'Sunday DRV')
      .page.planPage().getSpotPricePreAndPostDiscount(data.daypart.EVE,data.day.sunday, 'Sunday EVE')

      .page.planPage().saveAndContinue()

      //Book order
      //.page.analysePage().changeProduct('Commercial Airtime')
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
    }
};