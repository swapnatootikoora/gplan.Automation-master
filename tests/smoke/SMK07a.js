var data = require('../../data/DataProvider');
var Logger = require('nightwatch/lib/util/logger');

module.exports = {
  'Create a National CATO Order with multiple BAIGs and gPrime Discounts,' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter AGENCY order details (national sales)
      .page.orderPage().enterOrderName(data.smk07Data.catoorderDetails.nameNational)
      .page.orderPage().enterAgencyDetails(data.smk07Data.orderDetailsNational)
      .page.orderPage().enterSalesTeam(data.smk07Data.orderDetailsNational)
      .page.orderPage().enterPONumber(data.smk07Data.catoorderDetails.name)
      .page.orderPage().saveOrderDetails()

     //Create CATO details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.smk07Data.catoDetails.startInA)
      .page.catoPage().calculateAndSelectEndDate(data.smk07Data.catoDetails.duration)
      .pause(500)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .pause(500)

      //Verify No ABI Discount
      .page.catoPage().verifyNoABIDiscount()
      
      //Update Start & End Dates
      .page.catoPage().calculateAndSelectStartDate(data.smk07Data.catoDetails.startInB)
      .page.catoPage().calculateAndSelectEndDate(data.smk07Data.catoDetails.duration)
      .pause(500)

      //Verify ABI Discount 
      .page.catoPage().verifyABIDiscountNational()
        
      //Add Multiple BAIGs
      .page.catoPage().addMultipleBAIG()
      .pause(500)
      .page.catoPage().configureBudget(data.smk07Data.catoDetails.budget)
      .pause(500)
   
      //Verify BAIG Discounts
      .page.catoPage().verifyNoBAIGDiscount()
      .page.catoPage().verifyBAIGDiscount()

      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //View spots on CATO
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek2()

      //delete spots
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.NHT, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.BRK, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.MRN, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.AFT, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.DRV, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.monday)

      //set each day part to have 2 spots (1 mins)
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.monday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.monday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.monday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT,data.day.monday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.DRV,data.day.monday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.monday, 2)

      //Save Plan & return to order details
      .page.planPage().saveAndContinue()
      .pause(500)
      .page.analysePage().changeProduct('Commercial Airtime')

      //Book CATO order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()

      .end()
    },
};
