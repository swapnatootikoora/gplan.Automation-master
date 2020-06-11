var data = require('../../data/dataProvider');

module.exports = {
  'Regional Revenue page, filter team' : function (browser) {

  	browser
      .page.loginPage().goToLogin(data.url)
      .page.loginPage().login(data.url, data.username, data.password)

      .page.ordersPage().goToRegionalRevenuesPage()
      
      .page.revenueSummaryPage().selectASalesTeam()
      .page.revenueSummaryPage().openFirstMonthTotalList()

      .end()
	}
};