var data = require('../../data/dataProvider');

module.exports = {
  'Create a DAX order, submit for approval and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.san4Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.local)
      .page.orderPage().enterSalesTeam(data.orderDetails.local)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewDaxOption()

      //Enter DAX details
      .page.daxPage().calculateAndSelectStartDate(data.san4Data.daxDetails.startIn)
      .page.daxPage().calculateAndSelectEndDate(data.san4Data.daxDetails.duration)
      .page.daxPage().setSingleDAXFlight(data.san4Data.daxDetails)
      .page.daxPage().saveAndContinueDAX()

      //Verify impressions & Book order
      .page.orderPage().daxVerifyImpressions(data.san4Data.daxDetails.grossRevenue, data.san4Data.daxDetails.cpm)
      .page.orderPage().daxSubmitForApproval()

      .page.analysePage().getOrderNumber(function(orderNumber){

      browser
        //Go to dax admin
        .page.daxAdminPage().goToDaxAdminPage(data.url)
        .page.daxAdminPage().searchOrderNumber(orderNumber)   
        .page.daxAdminPage().approveDaxOption()

        .page.ordersPage().goToOrdersPage(data.url)
        .page.ordersPage().searchOrderAndGoToOrder(orderNumber)

        .page.orderPage().preBookOrder()
        .page.orderPage().bookOrder()
        .end()

      })
  }
};