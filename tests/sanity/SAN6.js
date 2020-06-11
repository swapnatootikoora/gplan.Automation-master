var data = require('../../data/dataProvider');

module.exports = {
  'Create a package, create package option and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.san6Data.orderDetails.packageSourceName)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)
      .page.orderPage().saveOrderDetails()
      .page.orderPage().createNewAirtimeOption()

      //Enter airtime details
      .page.catoPage().calculateAndSelectEndDate(data.san6Data.sourceCatoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Get the order number from gPlan
      .page.analysePage().getOrderNumber(function(orderNumber){

      browser
        //Go to admin/packages
        .page.packagePage().goToAdminPackages(data.url)
        .page.packagePage().clickCreateNewButton()
        .page.packagePage().enterPackageName(orderNumber)
        .page.packagePage().enterPackageDescription(data.san6Data.packageDetails.summary)
        .page.packagePage().selectSellBetweenEndDate(data.san6Data.packageDetails.sellBetween)
        .page.packagePage().selectOrderStartBetweenEndDate(data.san6Data.packageDetails.startBetween)
        .page.packagePage().enterPackageDurationAndTierAndPaymentType(data.san6Data.packageDetails)
        .page.packagePage().enterGplanOrderId(orderNumber)
        .page.packagePage().clickGetOrder()
        .page.packagePage().selectVersion(data.san6Data.packageDetails.version)
        .page.packagePage().enterCostPerMonthBuyingArea(data.san6Data.packageDetails.cpm)
        .page.packagePage().clickSave()

        //Create package option
        .page.ordersPage().goToOrdersPage(data.url)
        .page.ordersPage().goToNewOrder()
        .page.orderPage().packageOptionEnterOrderName(data.san6Data.orderDetails.packageOptionName)
        .page.orderPage().enterAgencyDetails(data.orderDetails.national)
        .page.orderPage().enterSalesTeam(data.orderDetails.national)
        .page.orderPage().saveOrderDetails()
        .page.orderPage().createNewPackageOption()

        //Enter airtime details
        .page.packageOptionPage().addSingleRajar()
        .page.packageOptionPage().selectPackage(orderNumber)
        .page.packageOptionPage().enterPackageOptionName(orderNumber)
        .page.packageOptionPage().selectStartDateFromToday(data.san6Data.packageOptionDetails.startFrom)
        .page.packageOptionPage().clickAddToOrder()
        .pause(500)
        //.page.packageOptionPage().checkOpeProgress()
        .page.orderPage().preBookOrder()
        .pause(500)
        //.page.orderPage().bookOrder()
        .end()
      })  
  }
};