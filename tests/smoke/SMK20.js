var data = require('../../data/DataProvider');

module.exports = {
  'Add and amend invoice schedule on order with CATO' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk20Data.catoorderDetails.name)
      .page.orderPage().enterAgencyDetails(data.smk20Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk20Data.orderDetails)
      .page.orderPage().saveOrderDetails() 

      //Create CATO details
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.smk20Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk20Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addSingleRajar()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Book CATO order WITHOUT invoice schedule
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      //Amend the order
      .page.orderPage().amendOrder()

      //Add invoice schedule and Check error on save when no title text is present
      .page.orderPage().addInvoiceSchedule()
      .page.invoiceSchedulePage().addInvoiceScheduleDetailsWithoutText(data.smk20Data.invoiceScheduleDetails)
      .page.invoiceSchedulePage().saveInvoiceScheduleWithoutText()

      //Add title text to invoice schedule and save
      .page.invoiceSchedulePage().addInvoiceScheduleDetailsWithText(data.smk20Data.invoiceScheduleDetails)
      .page.invoiceSchedulePage().saveInvoiceScheduleWithText()

      //Edit the invoice schedule to clear rows, re-enter values and spread revenue equally before saving changes
      .page.invoiceSchedulePage().clearAndReplaceInvoiceScheduleRevenueSplitWithTotal()
      .page.invoiceSchedulePage().saveInvoiceScheduleWithText()
      .page.invoiceSchedulePage().applyInvoiceScheduleRevenueEqualSpread()
      .page.invoiceSchedulePage().saveInvoiceScheduleWithText()

      //Book CATO order WITH invoice schedule
      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()

      .end()
    }
};