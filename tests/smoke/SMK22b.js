var data = require('../../data/DataProvider');

module.exports = {
  'Amend spots on NATIONAL agency CATO order and replan,' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter AGENCY order details (national sales)
      .page.orderPage().enterOrderName(data.smk22Data.catoorderDetails.nameNational)
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

      //verify national default of 4 spots per day part
      .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.BRK, data.day.thursday, 4)
      //Removed verification above because this day and daypart has a negative planning margin so spots won't be planned
      .page.planPage().verifySpotInPlannningGrid(data.daypart.MRN, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.AFT, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.DRV, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE, data.day.thursday, 4)
      //Removed verification above because this day and daypart has a negative planning margin so spots won't be planned

      //delete spots
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.NHT, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.BRK, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.MRN, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.AFT, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.DRV, data.day.thursday)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.thursday)

      //change to 1 spot per day part
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.thursday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.BRK,data.day.thursday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.thursday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.AFT,data.day.thursday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.DRV,data.day.thursday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.thursday, 1)

      //save, open planning objectives & generate a new plan (with default constraints)
      .page.planPage().clickSaveButton()
      .page.planPage().openPlanningObjectives()
      .page.planPage().createNewPlan()
      .page.planPage().checkOpeProgress()

      //verify national default of 4 spots per day part
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.BRK, data.day.thursday, 4)
      //Removed verification above because this day and daypart has a negative planning margin so spots won't be planned
      .page.planPage().verifySpotInPlannningGrid(data.daypart.MRN, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.AFT, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.DRV, data.day.thursday, 4)
      .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE, data.day.thursday, 4)
      //Removed verification above because this day and daypart has a negative planning margin so spots won't be planned

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
    }
};
