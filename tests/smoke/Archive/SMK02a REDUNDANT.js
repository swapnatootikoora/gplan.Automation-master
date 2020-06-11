var data = require('../../data/DataProvider');

module.exports = {
  'Create and book agency order with BT40' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk02Data.bt40orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.smk02Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk02Data.orderDetails)
      .page.orderPage().saveOrderDetails() 

      //Enter BT40 details 
      .page.orderPage().createNewBT40Option()
      .page.bT40Page().calculateAndSelectStartDate(data.smk02Data.bt40Details.startIn)
      .page.bT40Page().calculateAndSelectEndDate(data.smk02Data.bt40Details.duration)
      .page.bT40Page().addDefaultSpotLength() 
      .page.bT40Page().saveAndContinueBT40()  

      //Add spots to BT40
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1BT40()
      .page.planPage().bT40addSpotToPlanningGrid(2,2,1)
      .page.planPage().saveAndContinue()
      .page.analysePage().changeProduct('Big Top 40')

      //Book BT40 order
      .page.header().navigateToOrder()
      .page.orderPage().preBookOrder()
      .page.orderPage().bookOrder()

      .end()
  }
};