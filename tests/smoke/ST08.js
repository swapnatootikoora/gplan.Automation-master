var data = require('../../data/DataProvider');

module.exports = {
  'Create a S&P Order, Multiple RAJAR & non RAJAR, All Discounts. Manual(Edit + roll plan + book)' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st08Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewSPAirtimeOption()   

      //Enter airtime details 
      .page.spatoPage().addProductAndSpotlength(data.st08Data.spatoDetails.product1)
      .page.spatoPage().addMultipleRajarAndNonRajarBuyingAreas()
      .page.spatoPage().configureBuyingAreaDiscounts(data.st08Data.spatoDetails.baDiscount)
      .page.spatoPage().configureTacticalDiscounts(data.st08Data.spatoDetails.tacticalDiscount)
      .page.spatoPage().saveAndContinueSp()
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.monday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.MRN,data.day.thursday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.sunday, 1)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE,data.day.sunday, 1)
      .page.planPage().saveAndContinue()
      .page.analysePage().changeProduct('BTA - National')
      .page.analysePage().getOrderNumber(function(orderNumber){
        
        browser
          .page.ordersPage().goToOrdersPage(data.url)
          .page.ordersPage().searchOrderAndGoToOrder(orderNumber)

          .page.orderPage().goToFirstOptionDetails()
          .page.spatoPage().calculateAndSelectStartDate(data.st08Data.spatoDetails.startIn)
          .page.spatoPage().calculateAndSelectEndDate(data.st08Data.spatoDetails.duration)
          .page.spatoPage().saveAndContinueSp()

          .page.planPage().refreshPlanPage()
          .page.planPage().expandAllRows()
          .page.planPage().clickWeek1()
          .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT,data.day.monday, 1)
          .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE,data.day.monday, 1)
          .page.planPage().verifySpotInPlannningGrid(data.daypart.MRN,data.day.thursday, 1)
          .page.planPage().verifySpotInPlannningGrid(data.daypart.NHT,data.day.sunday, 1)
          .page.planPage().verifySpotInPlannningGrid(data.daypart.EVE,data.day.sunday, 1)
          .page.planPage().checkSpotMultiDiscount(data.daypart.NHT, data.day.monday, 
              [data.st08Data.spatoDetails.tacticalDiscount,
              data.st08Data.spatoDetails.baDiscount])

          .page.planPage().removeAllOversold()
          .page.planPage().clickSaveButton()
          .page.planPage().checkNotOversoldInLaydownGrid()
          .page.planPage().saveAndContinue()

          .page.analysePage().changeProduct('BTA - National')

          .page.header().navigateToOrder()
          .pause(500)
          .page.orderPage().preBookOrder()
          .pause(500)
          //.page.orderPage().bookOrder()

          .end();
      });
  }
};