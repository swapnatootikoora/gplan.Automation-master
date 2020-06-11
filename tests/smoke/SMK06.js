var data = require('../../data/DataProvider');


module.exports = {
  'Create a Digital order and book' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk06Data.digitalOrderDetails.name)
      .page.orderPage().enterAgencyDetails(data.smk06Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk06Data.orderDetails)
      .page.orderPage().saveOrderDetails() 
      .page.orderPage().createNewDigitalOption()

      //Enter Digital Option details   
      .page.digitalPage().calculateAndSelectStartDate(data.smk06Data.digitalDetails.startIn)
      .pause(500)
      .page.digitalPage().calculateAndSelectEndDate(data.smk06Data.digitalDetails.duration)
      .pause(500)

      //Enter Flight Details
      .page.digitalPage().selectDigitalProduct(data.smk06Data.flightProducts.productA)
      .page.digitalPage().selectDigitalSubProduct(data.smk06Data.flightProducts.subProductA)

      .page.digitalPage().calculateAndSelectFlightStartDate(data.smk06Data.flightDetails.startIn)
      .page.digitalPage().calculateAndSelectFlightEndDate(data.smk06Data.flightDetails.duration)
      
      .page.digitalPage().addSingleNonRajar()
      
      .page.digitalPage().setSingleDigitalFlightRevenueOnly(data.smk06Data.revenue.grossRevenue)
      
      //Verify Impressions are Read Only
      //.page.digitalPage().verifyImpressionsReadOnly()

      //Enter different Products
      //.page.digitalPage().selectDigitalProduct(data.smk06Data.flightProducts.productB)
      //.page.digitalPage().selectDigitalSubProduct(data.smk06Data.flightProducts.subProductB)

      //Enter Flight Impressions
      //.page.digitalPage().setSingleDigitalFlightRevenueAndImpressions(data.smk06Data.revenue)

      .page.digitalPage().saveAndContinueDigital()
      .pause(500)

      //Book order
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      .end()
  }
};