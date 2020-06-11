var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var moment = require('moment');

module.exports = function (browser) {

	this.goToDaxAdminPage = function(url) {
		return browser  
      		.url(url + '/admin/daxordersadmin')
        	.waitForElementVisible('.m-admin')
        	.saveScreenshot(generateScreenShotFilePath('Dax Admin Page'));
	}

	this.searchOrderNumber = function(orderNumber) {
		return browser
			.waitForElementVisible('#orderId')
			.setValue('#orderId', orderNumber)
			.click('form[action="/admin/daxordersadmin"] input[type="submit"]')
			.pause(1000)
			.saveScreenshot(generateScreenShotFilePath('Search results'));
	}

	this.approveDaxOption = function() {
		return browser
			.waitForElementVisible('.readableTable tbody tr:first-child')
			.click('.readableTable tbody tr:first-child #showHideButton')
			.waitForElementVisible('.readableTable tbody tr:nth-child(2) .approveBtn')
			.click('.readableTable tbody tr:nth-child(2) .approveBtn')
			.saveScreenshot(generateScreenShotFilePath('Dax approval'));
	}

	this.rejectDaxOption = function() {
		return browser
			.waitForElementVisible('.readableTable tbody tr:first-child')
			.click('.readableTable tbody tr:first-child #showHideButton')
			.waitForElementVisible('.readableTable tbody tr:nth-child(2) .rejectBtn')
			.click('.readableTable tbody tr:nth-child(2) .rejectBtn')
			.saveScreenshot(generateScreenShotFilePath('Dax rejection'));
	}
};