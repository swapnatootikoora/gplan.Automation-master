var data = require('../../data/DataProvider');


module.exports = {
  'Create a DAX order, submit for approval and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk03Data.daxorderDetails.name)
      .page.orderPage().enterAgencyDetails(data.smk03Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk03Data.orderDetails)
      .page.orderPage().saveOrderDetails() 
      .page.orderPage().createNewDaxOption()

      //Enter DAX details   
      //.page.daxPage().addDaxDetails()
      .page.daxPage().calculateAndSelectStartDate(data.smk03Data.daxDetails.startIn)
      .page.daxPage().calculateAndSelectEndDate(data.smk03Data.daxDetails.duration)
      .page.daxPage().setSingleDAXFlight(data.smk03Data.daxDetails)
      .page.daxPage().saveAndContinueDAX()
      .pause(500)

      //Verify impressions & Submit DAX for approval
      .page.orderPage().daxVerifyImpressions(data.smk03Data.daxDetails.grossRevenue, data.smk03Data.daxDetails.cpm)
      .pause(500)
      .page.orderPage().daxSubmitForApproval()
      .pause(500)

      //Reject DAX option & return to order and re-submit for approval
      .page.analysePage().getOrderNumber(function(orderNumber){
       browser

      //Open DAX admin & reject option
      .page.daxAdminPage().goToDaxAdminPage(data.url)
      .page.daxAdminPage().searchOrderNumber(orderNumber)   
      .page.daxAdminPage().rejectDaxOption()
      .pause(500)
        
      //Return to order
      .page.ordersPage().goToOrdersPage(data.url)
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)

      //Re-submit DAX for approval
      .page.orderPage().daxSubmitForApproval()
      .pause(500)
      })

      //Approve DAX option & Book order
      .page.analysePage().getOrderNumber(function(orderNumber){
      browser

      //Open DAX admin & approve option
      .page.daxAdminPage().goToDaxAdminPage(data.url)
      .page.daxAdminPage().searchOrderNumber(orderNumber)   
      .page.daxAdminPage().approveDaxOption()
      .pause(500)
        
      //Book order
      .page.ordersPage().goToOrdersPage(data.url)
      .page.ordersPage().searchOrderAndGoToOrder(orderNumber)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)

      .end()

      })
  }
};