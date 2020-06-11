var data = require('../../data/DataProvider');
var Logger = require('nightwatch/lib/util/logger');

module.exports = {
  'Create an agency order with Newslink [Note: manually add JCN and dummy JCN to book]' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk02Data.newslinkorderDetails.name)
      .page.orderPage().enterAgencyDetails(data.smk02Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk02Data.orderDetails)
      .page.orderPage().saveOrderDetails() 

      //Enter Newslink details   
      .page.orderPage().createNewNewslinkOption()
      .page.newslinkPage().calculateAndSelectStartDate(data.smk02Data.newslinkDetails.startIn)
      .page.newslinkPage().calculateAndSelectEndDate(data.smk02Data.newslinkDetails.duration)
      .page.newslinkPage().addProduct(data.smk02Data.newslinkDetails.product1)
      .page.newslinkPage().addDefaultSpotLength() 
      .page.newslinkPage().saveAndContinueNewslink()  

      //Add spots to Newslink
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1Newslink()
      .page.planPage().newslinkAddSpotToPlanningGrid(2,2,1)
      .page.planPage().saveAndContinue() 
      //.page.analysePage().changeProduct('Newslink 1pm')

      //Book Newslink order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //Order requires valid unused JCN & Dummy JCN in order to be booked
      //.page.orderPage().bookOrder()

      .end()
  },

  'MANUAL FOLLOW UP REQUIRED' : function (browser) {
    browser
      console.log(Logger.colors.purple('Now manually edit the order to add JCN & Dummy JCN before booking to complete the test.'))
    browser.end()
  }
};





