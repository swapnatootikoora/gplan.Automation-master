var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

	this.topLevelFilter = function(filterData) {

		if (filterData.endMonth) {
			browser.selectOption('.filters .filters-row:first-child span:nth-of-type(1) select', filterData.endMonth);
		}

		if (filterData.startMonth) {
			browser.selectOption('.filters .filters-row:first-child span:nth-of-type(1) select', filterData.endMonth);
		}

		if (filterData.revenueType) {
			browser.selectOption('.filters .filters-row:nth-child(2) select', filterData.revenueType);
		}

		if (filterData.salesTeam) {
			browser.selectOption('.filters .filters-row:nth-child(3) select', filterData.salesTeam);
		}

		return browser
			.click('.filter-button')
			.waitForElementNotVisible('.filter-button .loader-container')
			.waitForElementPresent('.revenue-table tbody tr');
	};

	this.filterOrderNumber = function(orderNumber) {
		return browser
			.execute(function(value) {
		         $('.revenue-table th:nth-child(3) .filter-trigger').triggerHandler('click');
		      }
		    )
			.waitForElementVisible('.spa-revenues-list-content .filters .filter-input')
			.setValue('.spa-revenues-list-content .filters .filter-input', orderNumber)
			.saveScreenshot(generateScreenShotFilePath('Revenue list filtering'));
	};

	this.checkRevenueLineRevenue = function (netRevenue) {
		return browser
			.getText('.revenue-table tbody tr td:last-child', function (revenueLineNetRevenue) {

      			revenueLineNetRevenue = parseFloat(revenueLineNetRevenue.value, 10);
      			browser.verify.equal(netRevenue, revenueLineNetRevenue, 'Net revenue is correct');
		    });
	};

	this.navigateToFirstRevenueRecord = function () {
		return browser
			.click('.revenue-table tbody tr:first-child a')
			.waitForElementVisible('.spa-record-revenue')
	};

	this.openCustomiseGrid = function () {
		return browser
			.click('.show-hide-columns')
			.waitForElementVisible('.columns-toggle');
	}

	this.showTagsColumn = function () {
		return browser
			.click('.columns-toggle > ul li:nth-child(8) input');

	};

	this.checkRevenueLineTagContains = function (tagText) {
		return browser
			.getText('.revenue-table tbody tr:first-child td:nth-child(8)', function (revenueLineTags) {
      			browser.verify.equal(true, revenueLineTags.value.indexOf(tagText) > -1, 'Revenue line tag correct');
		    });
	}

	this.openNewRevenueRecord = function () {
		return browser
			.click('#newRevenueButton .spa-split-button-main')
			.waitForElementVisible('.spa-record-revenue');
	};

};