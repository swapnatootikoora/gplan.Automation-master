var data = require('../../data/dataProvider');

module.exports = {
  'Create a newslink option - DOES NOT BOOK' : function (browser) {

    browser
    	.page.loginPage().goToLogin(data.url)
      	.page.loginPage().login(data.url, data.username, data.password)
      	.page.ordersPage().goToNewOrder()

	      //Enter order details
	    .page.orderPage().enterOrderName(data.san7Data.orderDetails.name)
	    .page.orderPage().enterAgencyDetails(data.orderDetails.national)
	    .page.orderPage().enterSalesTeam(data.orderDetails.national)
	    .page.orderPage().saveOrderDetails()
	    .page.orderPage().createNewNewslinkOption()

      //Newslink details
      .page.newslinkPage().calculateAndSelectStartDate(data.san7Data.newslinkDetails.startIn)
      .page.newslinkPage().calculateAndSelectEndDate(data.san7Data.newslinkDetails.duration)
      .page.newslinkPage().addDefaultSpotLength()
      .page.newslinkPage().saveAndContinueNewslink()

      //Plan page enter spots
      .page.planPage().expandAllRows()
      .page.planPage().clickWeek1Newslink()
      .page.planPage().newslinkAddSpotToPlanningGrid(1,2,1)
      .page.planPage().newslinkAddSpotToPlanningGrid(2,3,1)
      .page.planPage().newslinkAddSpotToPlanningGrid(3,4,1)
      .page.planPage().newslinkAddSpotToPlanningGrid(4,5,1)
      .page.planPage().newslinkAddSpotToPlanningGrid(5,6,1)
      .page.planPage().newslinkAddSpotToPlanningGrid(6,7,1)
      .page.planPage().newslinkAddSpotToPlanningGrid(7,8,1)
      .page.planPage().clickSaveButton()

      .page.header().navigateToOrder()
      .end()
  }
};