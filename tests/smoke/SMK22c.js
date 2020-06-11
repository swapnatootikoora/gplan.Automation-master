var data = require('../../data/DataProvider');
var Logger = require('../../node_modules/nightwatch/lib/util/logger.js');

module.exports = {
  'Book 5 min of spots on National agency CATO order to deplete Jupiter Availability,' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter AGENCY order details (national sales)
      .page.orderPage().enterOrderName(data.smk22Data.catoorderDetails.nameNationalAvail)
      .page.orderPage().enterAgencyDetails(data.smk22Data.orderDetailsNational)
      .page.orderPage().enterSalesTeam(data.smk22Data.orderDetailsNational)
      .page.orderPage().saveOrderDetails()

     //Create CATO details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.smk22Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk22Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //View spots on CATO
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()

      //delete spots
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.NHT, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.BRK, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.MRN, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.AFT, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.DRV, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.thursday)

      //set each day part to have 4 spots (2 mins)
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.thursday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.thursday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.thursday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT,data.day.thursday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.DRV,data.day.thursday, 2)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.thursday, 2)

      //Save Plan & return to order details
      .page.planPage().saveAndContinue()
      .page.analysePage().changeProduct('Commercial Airtime')

      //Book CATO order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      .end()
    },

  'MANUAL FOLLOW UP REQUIRED' : function (browser) {
    browser
      //prompt to check jupiter avails in 30 mins and compare against order
      console.log(Logger.colors.purple('Wait 30 mins then cross-check availability reported in Jupiter Avails against availability displayed on the order created for this test.'))
    browser.end()
  }
};
