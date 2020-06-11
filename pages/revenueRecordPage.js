var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var randomNameGenerator = require('../utils/randomNameGenerator');

module.exports = function (browser) {

	this.checkRevenueRecordDetails = function (orderNumber, orderDetails) {

		return browser
			.getValue('#orderNumber', function (textResponse) {
				browser.verify.equal(textResponse.value, orderNumber, 'Revenue record order number correct');
			})
			.getValue('#agencySearch', function (textResponse) {
				browser.verify.equal(textResponse.value, orderDetails.agencySearchResult, 'Revenue record agency correct');
			})
			// .execute(function() {
 		// 		return $('#agencyClientSelect option:checked').text();
			// },[],
			// function (clientText) {
			// 	browser.verify.equal(clientText.value, orderDetails.client, 'Revenue record agency client correct');
			// })
			.execute(function() {
 				return $('#salesExec option:checked').text();
			},[],
			function (clientText) {
				browser.verify.equal(clientText.value, orderDetails.salesExec, 'Revenue record sales exec correct');
			})
			// .getText('.select-buying-area-list', function (textResponse) {
			// 	console.log(textResponse.value);
			// })
	};

	this.startEditingRecord = function() {
		return browser
			.click('#regionalRevenueEdit')
			.waitForElementPresent('.revenue-tags input:not([disabled])');
	};

	this.tagRevenue = function() {
		return browser
			.click('.revenue-tags li:first-child input')
			.click('#regionalRevenueSave')
			.waitForElementPresent('.revenue-tags input[disabled]');
	};

	this.goBack = function () {
		return browser
			.click('#regionalRevenueBack')
			.waitForElementVisible('.spa-revenues-list');
	};

	this.saveAndContinue = function () {
		return browser
			.click('#regionalRevenueSaveContinue')
			.waitForElementPresent('.spa-revenues-list');
	};

	this.save = function () {
		return browser
			.click('#regionalRevenueSave')
			.waitForElementPresent('.revenue-tags input[disabled]');
	};

	this.enterRevenueRecordDetails = function (data) {
		return browser
			.setValueWithChangeEvent('#orderNumber', randomNameGenerator())
			.setValueWithChangeEvent('#directClientSearch', data.directClientSearch)
			.setValue('#directClientSearch', [data.directClientSearch, browser.Keys.ENTER])
			.setValue('#directClientSearch', browser.Keys.ENTER)
			.waitForElementVisible('#directClientSearchResults')
			.verify.elementPresent('#directClientSearchResults tbody tr')
			.selectTableRow('#directClientSearchResults .search-results-container', data.clientSearchResult)
			.selectOption('#salesExec', data.salesExec)
			.saveScreenshot(generateScreenShotFilePath('Record revenue details entered'));

	};

	this.addBuyingAreas = function() {
    	return browser
			.click('#addBuyingAreasButton')
			.waitForElementVisible('.buying-area-selection-dialog')
			.click('.navigation-list .navigation-item:first-child')
			.waitForElementVisible('#baListForBrand')
			.click('#baListForBrand li:first-child .select-item-check')
			.click('#buttonAddSelectedBas')
			.waitForElementNotVisible('.buying-area-selection-dialog')
			.verify.elementPresent('.select-buying-area')
			.saveScreenshot(generateScreenShotFilePath('Record revenue buying areas added'))
	}

	this.enterRevenuesAndVerifyTotals = function() {
		return browser
			.setValueWithChangeEvent('.revenue-cell:nth-child(2) input', '10.25')
			.setValueWithChangeEvent('.revenue-cell:nth-child(3) input', '15.01')
			.setValueWithChangeEvent('.revenue-cell:nth-child(4) input', '16.23')
			.setValueWithChangeEvent('.revenue-cell:nth-child(5) input', '45.02')
			.saveScreenshot(generateScreenShotFilePath('Billing Line Revenue Entered'))
			.getText('.revenue-table tbody tr:first-child .total-cell', function(textResponse) {
				browser.verify.equal('86.51', textResponse.value, 'Revenue row total correct')
			}).getText('.footer-row .total-cell:nth-child(2)', function(textResponse) {
				browser.verify.equal('10.25', textResponse.value, 'Revenue column total correct');
			}).getText('.footer-row .total-cell:nth-child(3)', function(textResponse) {
				browser.verify.equal('15.01', textResponse.value, 'Revenue column total correct');
			}).getText('.footer-row .total-cell:nth-child(4)', function(textResponse) {
				browser.verify.equal('16.23', textResponse.value, 'Revenue column total correct');
			}).getText('.footer-row .total-cell:nth-child(5)', function(textResponse) {
				browser.verify.equal('45.02', textResponse.value, 'Revenue column total correct');
			}).getText('.footer-row .total-cell:nth-child(6)', function(textResponse) {
				browser.verify.equal('86.51', textResponse.value, 'Revenue column total correct');
			})
			.saveScreenshot(generateScreenShotFilePath('Record revenue revenue added'));
	}
};