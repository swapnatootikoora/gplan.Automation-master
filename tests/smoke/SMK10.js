var data = require('../../data/DataProvider');

module.exports = {

  'Analyse basket - expand buying areas and month splits' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      //start new order
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.smk10Data.catoorderDetails.name)
      .page.orderPage().enterAgencyDetails(data.smk10Data.orderDetails)
      .page.orderPage().enterSalesTeam(data.smk10Data.orderDetails)
      .page.orderPage().saveOrderDetails() 

      //Create CATO details with both Rajar & Non-Rajar buying areas
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().calculateAndSelectStartDate(data.smk10Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.smk10Data.catoDetails.duration)
      .page.catoPage().addDefaultProductsAndSpotlength()
      //.page.catoPage().addSingleRajar()
      //.page.catoPage().addSingleNonRajar()
      .page.catoPage().addRajarAndNonRajarBuyingAreas()
      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Save Plan & return to order details
      .page.planPage().saveAndContinue()
      .pause(1000)
      .page.analysePage().changeProduct('Commercial Airtime')

      //Book CATO order
      .page.header().navigateToOrder()
      .page.orderPage().preBookOrder()
      .pause(500)
      .page.orderPage().bookOrder()
      .pause(500)

      //Open Basket analyse page from booked basket
      .page.orderPage().analyseBasket()

      // Expand, collapse & check RAJAR survey details of buying area and total rows
      //1st buying area - RAJAR Buying Area - expand and collapse all levels
      .page.analyseBasketPage().expandAnalyseGridRow(1)
      .page.analyseBasketPage().checkRajarSurveyVisible(3)
      .page.analyseBasketPage().expandBuyingAreaRow(3)
      .page.analyseBasketPage().collapseAnalyseGridRow(3)
      .page.analyseBasketPage().collapseAnalyseGridRow(1)
      
    //2nd buying area - Non-RAJAR Buying Area - expand all levels but collapse at brand level
      .page.analyseBasketPage().expandAnalyseGridRow(6)
      .page.analyseBasketPage().expandBuyingAreaRow(8)
      .page.analyseBasketPage().checkParentRajarSurveyVisible(8)
      .page.analyseBasketPage().collapseAnalyseGridRow(6)
     
      //Total RAJAR
      .page.analyseBasketPage().expandAnalyseGridRow(11)
      .page.analyseBasketPage().collapseAnalyseGridRow(11)
      
      //Total Non-RAJAR
      .page.analyseBasketPage().expandAnalyseGridRow(29)
      .page.analyseBasketPage().collapseAnalyseGridRow(29)

      //Collapse & Expand Buying areas Month Splits
      .page.analyseBasketPage().collapseAll()
      .page.analyseBasketPage().expandAll()
            
      .end()
    } 
};