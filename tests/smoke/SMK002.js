var data = require('../../data/DataProvider');

module.exports = {
  'Barter Agency Order including 3rd Party Owner effect' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk002Data.barterOrderDetails.name)
      .page.orderPage().enterBarterAgencyDetails(data.smk002Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk002Data.orderDetails)
      .page.orderPage().saveOrderDetails() 
      .page.orderPage().createNewAirtimeOption()

      //Enter airtime details with default plan dates & time band
      .page.catoPage().calculateStartDateFromNextDay(data.smk002Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk002Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .pause(500)
      .page.catoPage().addCapitalManchesterAndSmoothNorthWestBuyingAreas()
      .pause(500)
      .page.catoPage().saveAndContinueAirtime()
      .pause(1000)

      .page.catoPage().checkNoBarterValuesWarning()
      .page.catoPage().checkOpeProgress()
      .page.catoPage().checkBarterBuyingAreaFields()
      .page.catoPage().checkBarterCashAndTrade100Percent()
      .page.catoPage().checkBarterDealCannotBeTradeOnlyWarning()
      .page.catoPage().setValidBarterValuesForFirstBAOnly()
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().checkPreBookErrorBarterDealValuesRequired()
      .page.orderPage().closeBookingRequestAndReturnToFirstOption()

      .page.catoPage().setBarterCashTo90PercentOnThirdBA()
      .page.catoPage().checkBarterCashOnlyDealLessThan100PercentWarning()
      .page.catoPage().setBarterCashTo100PercentOnThirdBA()

      .page.catoPage().setValidBarterValuesForSecondBAOnly()
      .page.catoPage().saveAndContinueAirtime()
      .pause(1000)

      .page.header().navigateToOrder()
      .page.orderPage().preBookOrder()
      //.page.orderPage().bookOrder()
      
      .end()
  }
};