var data = require('../../data/DataProvider');

module.exports = {
  'Create and book Agency order with Soniq Option optimised by Audience Efficiency' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk01Data.soniqAgencyOrderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.national)
      .page.orderPage().enterSalesTeam(data.orderDetails.national)

      .page.orderPage().saveOrderDetails() 

      //Enter Soniq Option details
      .page.orderPage().createNewSoniqOption() 
      .page.soniqPage().calculateAndSelectStartDate(data.smk01Data.soniqDetails.startIn)
      .page.soniqPage().calculateAndSelectEndDate(data.smk01Data.soniqDetails.duration)
      .page.soniqPage().selectTargetAudiences(data.smk01Data.soniqDetails.audiences)
      .page.soniqPage().addDefaultProductsAndSpotlength()
 
      //Discounts/budget
      .page.soniqPage().configureBudget(data.smk01Data.soniqDetails.budget)
      .page.soniqPage().saveAndContinueSp()
      .pause(1000)
      .page.soniqPage().checkOpeProgress()

      //Validations in Plan page
      .page.planPage().changeProduct('All')
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().checkTotalValue(data.smk01Data.soniqDetails.budget)
      //.page.planPage().verifyCellIsReadOnly(data.daypart.BRK, data.day.saturday)
      .page.planPage().verifyDayIsReadOnly(data.day.monday)
      .page.planPage().verifyDayIsReadOnly(data.day.tuesday)
      .page.planPage().verifyDayIsReadOnly(data.day.wednesday)
      .page.planPage().verifyDayIsReadOnly(data.day.thursday)
      .page.planPage().verifyDayIsReadOnly(data.day.friday)
      .page.planPage().verifyDayIsReadOnly(data.day.saturday)
      .page.planPage().verifyDayIsReadOnly(data.day.sunday)

      //Book Soniq order
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      .end()
  }
};