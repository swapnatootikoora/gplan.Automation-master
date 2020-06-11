var data = require('../../data/dataProvider');

//ST02 Create a 4 week order starting midweek, a Buying Area has Timebands. Ensure that there are Multiple Rajar & NonRajar Buying Areas.
module.exports = {
  'CATO, 4 weeks starting midweek, multiple Rajar and non Rajar BAs, whole week spot fixing. Manual(BA discount, copy spots + book)' : function (browser) {
    browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)
      .page.ordersPage().goToNewOrder()

      //Enter order details
      .page.orderPage().enterOrderName(data.st02Data.orderDetails.name)
      .page.orderPage().enterAgencyDetails(data.orderDetails.local)
      .page.orderPage().enterSalesTeam(data.orderDetails.local)
      .page.orderPage().saveOrderDetails()

      //Enter airtime details 4 week
      .page.orderPage().createNewAirtimeOption()
      .page.catoPage().pickStartDateIn2MonthsStartSecondWeekWithOffset(data.st02Data.catoDetails.startIn)
      //.page.catoPage().calculateAndSelectStartDate(data.st02Data.catoDetails.startIn)
      .page.catoPage().calculateAndSelectEndDate(data.st02Data.catoDetails.duration)
      .page.catoPage().selectStartAndEndTimeForAnOrder(data.st02Data.catoDetails.timeRanges)
      .pause(500)
      .page.catoPage().selectApplyStartAndEndTimesToAllDays()
      .pause(500)
      //.page.catoPage().selectTargetAudiences(data.st02Data.catoDetails.audiences)
      .page.catoPage().avoidUnderage()
      //.page.catoPage().addDefaultProductsAndSpotlength()
      .page.catoPage().addProductAndSpotlengthTopAndTail(data.st02Data.catoDetails.product1)
      .page.catoPage().addMultipleRajarAndNonRajarBuyingAreas()

      .page.catoPage().setFirstBuyingAreaDateRangeTo1Week()

      .page.catoPage().saveAndContinueAirtime()
      .page.catoPage().checkOpeProgress()

      //Plan complete spot copying/fixing
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1()
      .page.planPage().checkWeekHasNoSpotsBeforeOffsetStart(data.st02Data.catoDetails.startIn.count)
      .page.planPage().addSpotToPlanningGrid(data.daypart.NHT,data.day.wednesday, 1)
      .page.planPage().clickSaveButton()
      .page.planPage().checkStartTimeBandFixing(data.daypart.NHT, data.day.wednesday, data.st02Data.catoDetails.timeRanges)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.NHT, data.day.wednesday)
      .page.planPage().clickSaveButton()

      .page.planPage().clickWeek2()
      //.page.planPage().verifyNoSpotFixingForTheWeek()
      .page.planPage().spotFixingBreakPositionForTheWholeWeek()
      //.page.planPage().spotFixingBreakPositionForTheWholeWeek()
      .page.planPage().verifyCellsWithValuesAreSpotFixed()
      .page.planPage().removespotFixingtForTheWholeWeek()

      .page.planPage().clickNthRow(7)
      .page.planPage().checkWeekHasNoSpotsAfterOffsetEnd(data.st02Data.catoDetails.startIn.count)
      .page.planPage().addSpotToPlanningGrid(data.daypart.EVE, data.day.tuesday, 1)
      .page.planPage().clickSaveButton()
      .page.planPage().checkEndTimeBandFixing(data.daypart.EVE, data.day.tuesday, data.st02Data.catoDetails.timeRanges)
      .page.planPage().deleteSpotInPlanningGrid(data.daypart.EVE, data.day.tuesday)
      .page.planPage().clickSaveButton()

      .page.planPage().clickNthRow(5)
      .page.planPage().checkWeekHasNoSpots()
      .page.planPage().clickNthRow(6)
      .page.planPage().checkWeekHasNoSpots()

      .page.planPage().saveAndContinue()

      .page.analysePage().changeProduct(data.st02Data.catoDetails.product1.product)

      .page.header().navigateToOrder()
      .pause(500)
      .page.orderPage().preBookOrder()
      .pause(500)
      //.page.orderPage().bookOrder()
      
      .end()
  }
};