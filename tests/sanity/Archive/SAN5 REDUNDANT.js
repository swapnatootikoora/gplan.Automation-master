var data = require('../../data/dataProvider');

module.exports = {
  'Create a BT40 order and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.san5Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewBT40Option()

      //Enter bt40 details
      .page.bT40Page().calculateAndSelectStartDate(data.san5Data.bt40Details.startIn)
      .page.bT40Page().calculateAndSelectEndDate(data.san5Data.bt40Details.duration)
      .page.bT40Page().addDefaultSpotLength()
      .page.bT40Page().saveAndContinueBT40()

      //Add spots to BT40
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().bT40addSpotToPlanningGrid(2,2,1)
      .page.planPage().bT40addSpotToPlanningGrid(4,2,1)
      .page.planPage().clickSaveButton()

      .page.header().navigateToOrder()
      .page.orderPage().preBookOrder()
      .page.orderPage().bookOrder()
      .end()
  }
};