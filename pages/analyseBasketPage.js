var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');

module.exports = function (browser) {

  this.changeProduct = function(productName) {
    return browser
      .click('#spotLengthList optgroup[label="' + productName + '"] option:first-child')
      .pause(1000)
      .waitForElementNotVisible('#filterDemographicSpinner .loader-container')
    	.saveScreenshot(generateScreenShotFilePath('Analyse Basket page filtering'));
  };


  this.expandAll = function() {
    return browser
      .pause(1000)
      .click('.app-content .spa-proposal-analyse-page .m-analyse-revenue .m-analyse-revenue-container .revenue-table .expand-collapse-all span:first-child')
      .pause(1000)
      .waitForElementVisible('.revenue-table tbody tr:first-child')
      .saveScreenshot(generateScreenShotFilePath('Analyse Basket page expand all month splits'));
  };


  this.collapseAll = function() {
    return browser
      .pause(1000)
      .click('.app-content .spa-proposal-analyse-page .m-analyse-revenue .m-analyse-revenue-container .revenue-table .expand-collapse-all span:nth-child(2)')
      .pause(1000)
      .waitForElementVisible('.revenue-table tbody tr:first-child')
      .saveScreenshot(generateScreenShotFilePath('Analyse Basket page collapse all month splits'));
  };

  this.expandAnalyseGridRow = function(row_number) {
    return browser
      .waitForElementVisible('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(1)')
      .click('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(1)')
      .pause(1000)
      .waitForElementVisible('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) .row-opened')

      .saveScreenshot(generateScreenShotFilePath('Analyse Basket expanding BA grid'));
  };

  this.collapseAnalyseGridRow = function(row_number) {
    return browser
      .click('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(1)')
      .pause(1000)
      var next_row_number = row_number.value + 1
      .waitForElementNotVisible('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + next_row_number + ').hidden-row')

      .saveScreenshot(generateScreenShotFilePath('Analyse Basket collapsing BA grid'));
  };

    this.expandBuyingAreaRow = function(row_number) {
    return browser
      .click('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(1)')
      .pause(1000)
      var next_row_number = row_number.value + 1
      .waitForElementVisible('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + next_row_number + ')')

      .saveScreenshot(generateScreenShotFilePath('Analyse Basket check RAJAR survey text'));
  };   

  this.checkRajarSurveyVisible = function(row_number) {
    return browser
      .pause(1000)
      .waitForElementVisible('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(13)')
      .getText('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(13) span', function (actualRAJARSurveyText) {
      actualRAJARSurveyText = actualRAJARSurveyText.value;
      browser.verify.equal(actualRAJARSurveyText, "RAJAR 6 months" ,'actual survey text is '+ actualRAJARSurveyText + ' and expected is RAJAR 6 months');
      })

      .saveScreenshot(generateScreenShotFilePath('Analyse Basket check RAJAR survey text'));
  };

  this.checkParentRajarSurveyVisible = function(row_number) {
    return browser
      .pause(1000)
      .waitForElementVisible('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(13)')
      .getText('.app-content .spa-proposal-analyse-page .m-analyse-revenue #analyseGridTable *:nth-child(3) tr:nth-child(' + row_number + ') td:nth-child(13) span', function (actualParentRAJARSurveyText) {
      actualParentRAJARSurveyText = actualParentRAJARSurveyText.value;
      browser.verify.equal(actualParentRAJARSurveyText, "% of RAJAR 6 months" ,'actual survey text is '+ actualParentRAJARSurveyText + ' and expected is % of RAJAR 6 months');
      })

      .saveScreenshot(generateScreenShotFilePath('Analyse Basket check parent RAJAR survey text'));
  };

};