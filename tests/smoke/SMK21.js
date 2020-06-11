var data = require('../../data/DataProvider');
var Logger = require('../../node_modules/nightwatch/lib/util/logger.js');

module.exports = {

 /* 'MANUAL ACTION REQUIRED' : function (browser) {
    browser
      //prompt to check jupiter avails in 30 mins and compare against order
      console.log(Logger.colors.purple('When the browser pauses on the Planning Objectives screen -> Move the Preserve Laydown > Order constraint to the High section and then click the New Plan button'))
    browser.end()
  },*/

  'Create Direct Client Order with fixed and oversold spots, then re-OPE (preserving laydown) before booking ,' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter DIRECT CLIENT order details (national sales)
      .page.orderPage().enterOrderName(data.smk21Data.catoorderDetails.name)
      .page.orderPage().enterDirectClientDetails(data.smk21Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk21Data.orderDetails)
      .page.orderPage().saveOrderDetails()

     //Create CATO details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.smk21Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk21Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //View spots on CATO
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()

      //confirm rows headings of NHT, BRK, MRN, AFT, DRV, EVE are present
      .page.planPage().verifyPlannningGridDaypartName(data.daypart.NHT, 'NHT')
      .page.planPage().verifyPlannningGridDaypartName(data.daypart.BRK, 'BRK')
      .page.planPage().verifyPlannningGridDaypartName(data.daypart.MRN, 'MRN')
      .page.planPage().verifyPlannningGridDaypartName(data.daypart.AFT, 'AFT')
      .page.planPage().verifyPlannningGridDaypartName(data.daypart.DRV, 'DRV')
      .page.planPage().verifyPlannningGridDaypartName(data.daypart.EVE, 'EVE')

      /*
      //testing using levers in OPE canvas - MANUAL INPUT REQUIRED
      .page.planPage().openPlanningObjectives()
      .page.planPage().dragAndDropPreserveLaydownProduct()
      
      //At this point the test will pause - tester needs to move the constraint into "High" and hit New Plan to start Re-OPE
      .page.catoPage().checkOpeProgress()

      //View spots on CATO
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      */

      //delete spots
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.NHT, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.BRK, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.MRN, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.AFT, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.DRV, data.day.monday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.monday)

      //fix one spot on AFT daypart
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT, data.day.monday, 1)
      .page.planPage().clickSaveButton()
      .page.planPage().verifyNoSpotFixingForTheWeek()
      .page.planPage().spotFixingBreakPositionForTheWholeWeek()
      .page.planPage().spotFixingBreakPositionForTheWholeWeek()
      .page.planPage().verifyCellsWithValuesAreSpotFixed()
      .page.planPage().clickSaveButton()

      //Re-OPE and confirm fixed spots still present
      .page.planPage().openPlanningObjectives()
      .page.planPage().createNewPlan()
      .page.planPage().checkOpeProgress()

      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()

      .page.planPage().verifyNoSpotFixingForTheWeek()

      //set BRK day parts to have 100 spots and confirm oversold
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.monday, 100)
      .page.planPage().clickSaveButton()
      .page.planPage().verifySpotInPlannningGrid(data.daypart.BRK, data.day.monday,100)
      .page.planPage().clickCheckOverSoldButton()
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1WithoutWaitingForLoader()
      .page.planPage().checkOversoldInLaydownGridSpot(data.daypart.BRK, data.day.monday)
      .page.planPage().checkLaydownSpotsAreOversold()

      //re-OPE and confirm no oversold spots
      .page.planPage().openPlanningObjectives()
      .page.planPage().createNewPlan()
      .page.planPage().checkOpeProgress()

      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()

      .page.planPage().checkNotOversoldInLaydownGrid()

      //Save Plan & return to order details
      .page.planPage().saveAndContinue()
      //.page.analysePage().changeProduct('Commercial Airtime')

      //Book CATO order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      .end()
    }
};
