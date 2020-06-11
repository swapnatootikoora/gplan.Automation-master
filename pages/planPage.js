//import { isNull } from 'util';

var generateScreenShotFilePath = require('../utils/generateScreenShotFilePath');
var Logger = require('../node_modules/nightwatch/lib/util/logger.js');

module.exports = function (browser) {

  this.checkTotalValue = function(maxTotal) {
    return browser
      .getText('.summary-grid tbody tr:last-child td.value-cell .cell-value', function (orderValue) {
        orderValue = parseFloat(orderValue.value.substring(1), 10);
        browser.verify.equal(true, maxTotal > orderValue, 'Option value ['+ orderValue +'] is less than budget [' + maxTotal + ']');
    });
  };

  this.changeProduct = function (productName) {
    return browser
      .selectOption('#spotLengthList', productName)
      .waitForElementNotPresent('.summary-grid .root-row.loading-all');
  };

  this.expandAllRows = function () {
    return browser
      .waitForElementVisible('.grid-heading-row .button-toggle:first-child')
      .click('.grid-heading-row .button-toggle:first-child')
      .pause(1000)
      .verify.elementNotPresent('.tier-one-row.has-children:not(.row-opened), .root-row.has-children:not(.row-opened)')
  }

  this.checkWeekHasSpecificSpots = function (weekNumber, spots) {

    var tierOneRowsCount = 0,
      tierTwoRowsCount = 0;

    return browser
      .elements('css selector', '.tier-one-row', function (tierOneRowsResponse) {

        tierOneRowsCount = tierOneRowsResponse.value.length;

        browser.elements('css selector', '.tier-two-row', function (tierTwoRowsResponse) {

          tierTwoRowsCount = tierTwoRowsResponse.value.length;
          var numberOfWeeks = tierTwoRowsCount / tierOneRowsCount;

          browser.elements('css selector', '.tier-two-row .spots-cell', function (tierTwoSpotCellsResponse) {

            var allCells = tierTwoSpotCellsResponse.value;
            var allCellsLength = allCells.length;
            for (var elementIndex = (weekNumber - 1); elementIndex < allCellsLength; elementIndex += numberOfWeeks) {

              browser.elementIdText(allCells[elementIndex].ELEMENT, function (cellText) {
                browser.verify.equal(cellText.value, spots.toString(), 'Week ' + weekNumber + ' has no spots');
              });
            }
          });
        });
      })
  }

  this.openPlanningObjectives = function () {
    return browser
      .waitForElementPresent('#planningObjectivesTab')
      .click('#planningObjectivesTab')
      .pause(1000)
      .waitForElementVisible('#optimisationDrawerPopup')
  }

  this.createNewPlan = function () {
    return browser
      .waitForElementPresent('#generatePlanButton')
      .click('#generatePlanButton')
      this.checkOpeProgress();
  }

  this.checkOpeProgress = function() {
    return browser
      .waitForElementVisible('.long-running-process', 200000)
      .waitForElementNotPresent('.long-running-process', 200000, true, captureOpeStatus)
      .waitForElementVisible('.plan-page')
  }

  function captureOpeStatus() {
    browser.saveScreenshot(generateScreenShotFilePath('OPE Status'));
  }


  this.checkLaydownSpotsAreOversold = function () {
    return browser
      .verify.elementPresent('tr.root-row.has-children td.spots-cell .is-oversold', 'Spots in brand overview are oversold')
      .verify.elementPresent('tr.tier-one-row.has-children td.spots-cell .is-oversold', 'Spots in selected buying area are oversold')
      .verify.elementPresent('tr.tier-two-row.selected-row td.spots-cell .is-oversold', 'Spots in selected row are oversold')
      .verify.elementPresent('tr.root-row td.spots-cell .is-oversold', 'Spots in Airtime totals are oversold')
  }

  this.checkSpotMultiDiscount = function(row, coln, data) {
    return browser
      .clearValue('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input.cell-value-edit')
      .setValueWithChangeEvent('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input', 3)
      .click('#savePlanButton')
      .waitForElementNotPresent('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input[disabled]')
      .click('#gridModeInfo')
      .waitForElementPresent('#gridModeInfo.toggle-on')
      .click('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input.cell-value-edit')
      .waitForElementVisible('#laydownGridSpotAttributes')
      .waitForElementNotVisible('#laydownGridSpotAttributes .loader-container')
      .getText('#grossPreDiscountPrice', function (preDiscount) {
        preDiscount = parseFloat(preDiscount.value.substring(1), 10);
        browser.getText('#grossPostDiscountPrice', function (postDiscount) {
          postDiscount = parseFloat(postDiscount.value.substring(1), 10);
          var arrayLength = data.length;
          var discountRatio = 1;
          for (var i = 0; i < arrayLength; i++) {
            var arrayValue = (100+data[i])/100;
            discountRatio = discountRatio*arrayValue;
          }
          var targetPostDiscount = preDiscount * discountRatio;
          var stringTargetPostDiscount = targetPostDiscount.toString();
          var intTargetPostDiscount = stringTargetPostDiscount.replace('.','');

          if(intTargetPostDiscount%2===0){
          /*  targetPostDiscount = (Math[(targetPostDiscount*100) < 0 ? 'ceil' : 'floor'](targetPostDiscount*100))/100;
          } else {
            targetPostDiscount = (Math[(targetPostDiscount*100) < 0 ? 'floor' : 'ceil'](targetPostDiscount*100))/100;
          }*/
          targetPostDiscount = (Math[(targetPostDiscount*100) < 0 ? 'ceil' : 'round'](targetPostDiscount*100))/100;
        } else {
          targetPostDiscount = (Math[(targetPostDiscount*100) < 0 ? 'round' : 'ceil'](targetPostDiscount*100))/100;
        }
          browser.verify.equal(targetPostDiscount, postDiscount, 'Spot discount is correct');
        });

      })
      .saveScreenshot(generateScreenShotFilePath('Laydown info popup'))
      .clearValue('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input')
      .click('#savePlanButton');

  }

  this.getSpotPricePreAndPostDiscount = function(row, coln, data) {
   return browser
      .waitForElementNotPresent('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input[disabled]')
      .click('#gridModeInfo')
      .waitForElementPresent('#gridModeInfo.toggle-on')
      .click('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input.cell-value-edit')
      .waitForElementVisible('#laydownGridSpotAttributes')
      .waitForElementNotVisible('#laydownGridSpotAttributes .loader-container')
      .getText('#grossPreDiscountPrice', function (preDiscount) {
        console.log('----------')
        console.log(data + ' pre discount ' + preDiscount.value)
      })
      .getText('#grossPostDiscountPrice', function (postDiscount) {
        console.log(data + ' post discount' + postDiscount.value)
        console.log('----------')
      })
      .saveScreenshot(generateScreenShotFilePath('Laydown info popup'))

  }

  this.checkSpotDiscount = function (row, coln, discount) {
    return browser
      .clearValue('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input.cell-value-edit')
      .setValueWithChangeEvent('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input', 3)
      .click('#savePlanButton')
      .waitForElementNotPresent('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input[disabled]')
      .click('#gridModeInfo')
      .pause(2000)
      .waitForElementPresent('#gridModeInfo.toggle-on')
      .click('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input.cell-value-edit')
      .pause(2000)
      .waitForElementVisible('#laydownGridSpotAttributes')
      .waitForElementNotVisible('#laydownGridSpotAttributes .loader-container')
      .getText('#grossPreDiscountPrice', function (preDiscount) {
	      preDiscount = parseFloat(preDiscount.value.substring(1), 10);
	      browser.getText('#grossPostDiscountPrice', function (postDiscount) {
	      	postDiscount = parseFloat(postDiscount.value.substring(1), 10);
	      	var discountRatio = (100 + discount) / 100;
	      	var targetPostDiscount = preDiscount * discountRatio;
          var stringTargetPostDiscount = targetPostDiscount.toString();
          var intTargetPostDiscount = stringTargetPostDiscount.replace('.','');

          if(intTargetPostDiscount%2===0){
            targetPostDiscount = (Math[(targetPostDiscount*100) < 0 ? 'ceil' : 'floor'](targetPostDiscount*100))/100;
          } else {
            targetPostDiscount = (Math[(targetPostDiscount*100) < 0 ? 'floor' : 'ceil'](targetPostDiscount*100))/100;
          }

	      	browser.verify.equal(targetPostDiscount, postDiscount, 'Spot discount is correct');
	      });
	    })
      .saveScreenshot(generateScreenShotFilePath('Laydown info popup'))
      .pause(1000)
      .clearValue('#laydownGridTable.loaded .day-part-row:nth-child('+row+') td:nth-child('+coln+') input')
      .click('#savePlanButton');
  }

  this.clickNthRow = function(n) {
    return browser
      .click('#spotLengthList optgroup:nth-child(2) option:first-child')
      .pause(1000)
      .waitForElementNotPresent('.summary-grid .root-row.loading-all')
      .click('.summary-grid tbody tr:nth-child('+ n +') td:first-child')
      //.waitForElementNotVisible('#laydown-grid .loading-grid .loader-container')
      .waitForElementNotPresent('#laydown-grid .loading-grid .loader-container')
      .saveScreenshot(generateScreenShotFilePath('Row '+ n +' selected'));
  }

  this.clickWeek1 = function () {
    return browser
      .click('#spotLengthList optgroup:nth-child(2) option:first-child')
      .waitForElementNotPresent('.summary-grid .root-row.loading-all')
      .click('.summary-grid tbody tr:first-child + tr.tier-one-row + tr.tier-two-row td:first-child')
      .waitForElementNotVisible('#laydown-grid .loading-grid .loader-container')
      .saveScreenshot(generateScreenShotFilePath('Week 1 selected'));
  }

  this.clickWeek2 = function () {
    return browser
      .click('#spotLengthList optgroup:nth-child(2) option:first-child')
      .waitForElementNotPresent('.summary-grid .root-row.loading-all')
      .click('.summary-grid tbody tr:first-child + tr.tier-one-row + tr.tier-two-row + tr.tier-two-row td:first-child')
      .waitForElementNotVisible('#laydown-grid .loading-grid .loader-container')
      .saveScreenshot(generateScreenShotFilePath('Week 2 selected'));
  }

  this.clickWeek1Newslink = function () {
    return browser
      .click('#spotLengthList optgroup:nth-child(2) option:first-child')
      .waitForElementNotPresent('.summary-grid .root-row.loading-all')
      .click('.summary-grid tbody tr:first-child + tr.tier-one-row + tr.tier-two-row td:first-child')
      .saveScreenshot(generateScreenShotFilePath('Newslink Week 1 selected'));
  }

/*
  this.clickWeek1BT40 = function () {
    return browser
      .click('#spotLengthList optgroup:nth-child(2) option:first-child')
      .waitForElementNotPresent('.summary-grid .root-row.loading-all')
      .click('.summary-grid tbody tr:first-child + tr.tier-one-row + tr.tier-two-row td:first-child')
      .saveScreenshot(generateScreenShotFilePath('BT40 Week 1 selected'));
  }
*/

  this.clickWeek1WithoutWaitingForLoader = function () {
    return browser
      .click('#spotLengthList optgroup:nth-child(2) option:first-child')
      .waitForElementNotPresent('.summary-grid .root-row.loading-all')
      .click('.summary-grid tbody tr:first-child + tr.tier-one-row + tr.tier-two-row td:first-child')
      .saveScreenshot(generateScreenShotFilePath('Week 1 selected'));
  }

  this.verifyPlannningGridDaypartName = function(row, DaypartName) {
    return browser
      .waitForElementVisible('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(1) span.daypart-name')
      .getText('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(1) span.daypart-name', function (actualDaypartName) {
      actualDaypartName = actualDaypartName.value;
      browser.verify.equal(actualDaypartName, DaypartName ,'actual day part name is '+ actualDaypartName + ' and expected is '+DaypartName);
    })
  }

  this.deleteSpotInPlanningGrid = function (row, col) {
    return browser
      .clearValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input')
      .saveScreenshot(generateScreenShotFilePath('Laydown while oversold spots'))
  }

  this.verifyNoSpotFixingForTheWeek = function() {
    for(var coln = 2; coln <9 ; coln++){
      for(var row = 1; row <7 ; row++){
        browser.verify.elementNotPresent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ').spot-fixed-cell');
      }
    }
    return browser;
  }

  this.verifyCellsWithValuesAreSpotFixed = function() {
    for(var coln = 2; coln <9 ; coln++){
      for(var row = 1; row <7 ; row++){
        checkCellValue(coln, row);
      }
    }   
    return browser;

    function checkCellValue(coln, row) {
        browser.getValue('#laydownGridTable .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > input.cell-value-edit', function (actualSpotCount) {
            actualSpotCount = actualSpotCount.value
            if(actualSpotCount != 0) {
              browser.verify.elementPresent('#laydownGridTable .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ').spot-fixed-cell');
            } else {
              browser.verify.elementNotPresent('#laydownGridTable .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ').spot-fixed-cell');
            }
        });
    }

  }

  this.spotFixingBreakPositionForTheWholeWeek = function () {
    return browser
      .click('#openSpotFixingForWeekDialogButton')
      .pause(1000)
      .waitForElementVisible('.spot-fixing-popup')
      .click('.fixing-toggle .fixing-toggle-switch:last-child')
      .pause(1000)
      .click('.spot-fixing-popup button.apply-fixing')
      //.pause(1000)
      //.waitForElementVisible('.spot-fixed-cell')
  }
  
  this.removespotFixingtForTheWholeWeek = function () {
    return browser
      .click('#openSpotFixingForWeekDialogButton')
      .pause(1000)
      .waitForElementVisible('.spot-fixing-popup')
      .click('.fixing-toggle .fixing-toggle-switch:first-child')
      .pause(1000)
      .click('.spot-fixing-popup button.apply-fixing')
      .pause(1000)
      .waitForElementVisible('.spot-fixed-cell')
  }

  this.verifySpotInPlannningGrid = function(row, col, spotCount) {
    return browser
      .waitForElementVisible('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') > input.cell-value-edit')
      .getValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') > input.cell-value-edit', function (actualSpotCount) {
      actualSpotCount = actualSpotCount.value;
      browser.verify.equal(actualSpotCount, spotCount ,'actual spot count is '+ actualSpotCount + ' and expected is '+spotCount);
    });
  };

  this.verifyCellIsReadOnly = function(row,col) {
    return browser
      .waitForElementVisible('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') > input.cell-value-edit')
      .getAttribute('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') > input.cell-value-edit', 'readonly', function(readonly) {
        browser.verify.equal(readonly.value, "true", 'readonly value is ' + readonly.value + ' and expected is true')
      });
  }

  this.verifyDayIsReadOnly = function(col) {
    for(var row = 1; row < 7; row++){
      this.verifyCellIsReadOnly(row,col);
    }

    return browser;
  }

this.verifySpotInLaydownGridExceptForaGivenDayIsZero = function(col) {

  for(var coln = 2; coln <9 ; coln++){

    if(col !== coln){

      for(var row = 1; row <7 ; row++){
        checkCellValue(coln, row);
      }
    }
  }

    return browser;

    function checkCellValue(coln, row) {
        browser.getValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > input.cell-value-edit', function (actualSpotCount) {
            actualSpotCount = actualSpotCount.value
            browser.verify.equal(actualSpotCount, 0 ,'actual spot count in '+row+','+coln+' is '+actualSpotCount + ' and expected is 0');
       });
    }

};

this.checkWeekHasNoSpotsBeforeOffsetStart = function(col) {

  for(var coln = 2; coln < (col+1) ; coln++){
    for(var row = 1; row <7 ; row++){
        checkCellValue(coln, row);
      }
  };

  return browser;
}

this.checkWeekHasNoSpotsAfterOffsetEnd = function(col) {

  for(var coln = col+1; coln < 9 ; coln++){
    for(var row = 1; row <7 ; row++){
        checkCellValue(coln, row);
      }
  };

  return browser;
}

this.checkWeekHasNoSpots = function() {
  for(var coln = 2; coln < 9 ; coln++){
    for(var row = 1; row <7 ; row++){
        checkCellValue(coln, row);
      }
  };
  return browser;
}

this.verifyWeekHasNoSpotsInSpecificDayPart = function(row) {
  for(var coln = 2; coln <9 ; coln++){
        checkCellValue(coln, row);
  }
    return browser;
}

this.verifyWeekHasNoSpotsInSpecificDay = function(col) {
  for(var row = 1; row <7 ; row++){
    checkCellValue(col, row);
  }
    return browser;
};

function checkCellValue(coln, row) {
        browser.getValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > input.cell-value-edit', function (actualSpotCount) {
            actualSpotCount = actualSpotCount.value;
            browser.verify.equal(actualSpotCount, 0 ,'actual spot count in '+row+','+coln+' is '+ actualSpotCount +' and expected is 0');
       });
}

this.verifySpotInLaydownGridColumnHaveAtleastaNonzero = function(col) {

    checkCellNotZeroValue(col, 1, []);

    return browser;

    function checkCellNotZeroValue(coln, row, cellValues) {
        browser.getValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > input.cell-value-edit', function (actualSpotCount) {
            actualSpotCount = actualSpotCount.value
            console.log('actual spot count in '+row+','+coln+'is '+actualSpotCount + ' and expected is 0');
            cellValues.push(actualSpotCount);

            if (row < 6) {
              checkCellNotZeroValue(coln, ++row, cellValues);
              return;
            }

            checkAtLeastOneCellNonZero(cellValues);
       });
    }

    function checkAtLeastOneCellNonZero(cellValues) {

      var nonZeroValueFound = cellValues.some(function (cellValue) {
        return !!cellValue;
      })
      browser.verify.equal(nonZeroValueFound, true, 'Column '+col + ' contains atleast a non zero spot');

    }

}

this.removeAllOversold = function() {
  for(var coln = 2; coln < 9 ; coln++){
    for(var row = 1; row < 7 ; row++){
        clearCellValueIfOversold(coln, row);
      }
  };
  return browser;

  function clearCellValueIfOversold(coln, row){
          browser.getAttribute('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > input.cell-value-edit', 'class', function(elementClass) {
              if((elementClass.value).indexOf('is-oversold') > -1){
                  browser.clearValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') input.cell-value-edit', function(){
                    browser.triggerEvent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') input.cell-value-edit', 'change');
                  });
              }
          });
  }
}


this.removeAllOversoldLiveReads = function() {
  for(var coln = 2; coln < 9 ; coln++){
    for(var row = 1; row < 15 ; row++){
        clearCellValueIfOversold(coln, row);
      }
  };
  return browser;

  function clearCellValueIfOversold(coln, row){
          browser.getAttribute('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > input.cell-value-edit', 'class', function(elementClass) {
              if((elementClass.value).indexOf('is-oversold') > -1){
                  browser.clearValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') input.cell-value-edit', function(){
                    browser.triggerEvent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') input.cell-value-edit', 'change');
                  });
              }
          });
  }
}

this.addXSpotsWhereNotOversold = function(maxNumberOfSpots) {

  var currentNumber = 1;

  for(var coln = 2; coln < 9 ; coln++){
    for(var row = 1; row <7 ; row++){
        addSpotIfAvailable(coln, row);
      }
  };
  return browser;

  function addSpotIfAvailable(coln, row){

          browser.getAttribute('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > span.cell-value-availability', 'class', function(elementClass) {
              if((elementClass.value).indexOf('avail-cold') > -1 && currentNumber<(maxNumberOfSpots+1)){
                  browser.setValueWithChangeEvent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') input.cell-value-edit', 1);
                  currentNumber++;
              }
          });
  }
}

this.verifySpotsNotOutsideTimeband = function () {

  var coln = arguments[0]

  for (var i = 1; i < arguments.length; i++){
    checkCellValue(coln,arguments[i]);
  }

  return browser;

  function checkCellValue(coln, row) {
        browser.getValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + coln + ') > input.cell-value-edit', function (actualSpotCount) {
            actualSpotCount = actualSpotCount.value
            browser.verify.equal(actualSpotCount, 0 ,'No spots outside Timeband: actual spot count in '+row+','+coln+' is '+actualSpotCount + ' and expected is 0');
       });
  }
}

this.checkStartTimeBandFixing = function(row, coln, data){
  return browser
    .click('#gridModeFixing')
    .pause(1000)
    .waitForElementPresent('#gridModeFixing.toggle-on')
    .verify.elementPresent('#laydownGridTable.loaded .day-part-row:nth-child('+ row +') td:nth-child('+ coln +').spot-fixed-cell')
    .click('#laydownGridTable.loaded .day-part-row:nth-child('+ row +') td:nth-child('+ coln +') .cell-value-availability')
    .pause(500)
    .waitForElementVisible('.spot-fixing-popup')
    .waitForElementVisible('select[name="timeBandStart"]')

    .getValue('select[name="timeBandStart"]', function (startTime) {
      startTime = startTime.value
      browser.verify.equal(startTime, data.startHours+':'+data.startMinutes ,'Start Timeband in '+row+','+coln+' is '+startTime + ' and expected is '+data.startHours+':'+data.startMinutes );
    });
}

this.checkEndTimeBandFixing = function(row, coln, data){
  return browser
    .click('#gridModeFixing')
    .waitForElementPresent('#gridModeFixing.toggle-on')
    .verify.elementPresent('#laydownGridTable.loaded .day-part-row:nth-child('+ row +') td:nth-child('+ coln +').spot-fixed-cell')
    .click('#laydownGridTable.loaded .day-part-row:nth-child('+ row +') td:nth-child('+ coln +') .cell-value-availability')
    .pause(500)
    .waitForElementVisible('.spot-fixing-popup')
    .waitForElementVisible('select[name="timeBandEnd"]')

    .getValue('select[name="timeBandEnd"]', function (endTime) {
      endTime = endTime.value
      browser.verify.equal(endTime, data.endHours+':'+data.endMinutes ,'End Timeband in '+row+','+coln+' is '+endTime + ' and expected is '+data.endHours+':'+data.endMinutes );
    });
}

  this.addSpotToPlanningGrid = function (row, col, spotCount) {
    return browser
      .waitForElementVisible('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit')
      .setValueWithChangeEvent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit', spotCount)
      .saveScreenshot(generateScreenShotFilePath('Laydown while oversold spots'))
  }

  this.newslinkAddSpotToPlanningGrid = function (row, col, spotCount) {
    return browser
      //.waitForElementVisible('#laydown-grid .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit')
      .setValueWithChangeEvent('#laydown-grid .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit', spotCount)
      .saveScreenshot(generateScreenShotFilePath('Laydown while oversold spots'))
  }

  this.liveReadAddSpotToPlanningGrid = function (row, col, spotCount) {
    return browser
      //.waitForElementVisible('#laydown-grid .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit')
      .setValueWithChangeEvent('#laydown-grid .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit', spotCount)
      .saveScreenshot(generateScreenShotFilePath('Laydown while oversold spots'))
  }
  
  this.liveReadSpotInPlanningGrid = function (row, col) {
    return browser
      .clearValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input')
      //.clearValue('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit', spotCount)
      .saveScreenshot(generateScreenShotFilePath('Laydown while oversold spots'))
  }

  this.bT40addSpotToPlanningGrid = function (row, col, spotCount) {
    return browser
      .waitForElementVisible('#laydownGridTable.loaded .day-part-row td:nth-child(' + col + ') input.cell-value-edit')
      //.setValueWithChangeEvent('#laydownGridTable.loaded .day-part-row td:nth-child(' + col + ') input.cell-value-edit', spotCount)
      .setValueWithChangeEvent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit', spotCount)
      .saveScreenshot(generateScreenShotFilePath('BT40 Laydown'))

  }

  this.clickSaveButton = function () {
    return browser
      .click('#savePlanButton')
      .pause(1000)
      .waitForElementNotPresent('#savePlanButton.loading')
      .saveScreenshot(generateScreenShotFilePath('after clicking Save button'))
  }


  this.clickCheckOverSoldButton = function () {
    return browser
      .click('#checkOversoldButton')

      .waitForElementVisible('#checkOversoldButton:enabled')
      .pause(1000)
      .saveScreenshot(generateScreenShotFilePath('Laydown with oversold spots after clicking button'))
  }

  this.checkOversoldInLaydownGridSpot = function (row, col) {
    return browser
      .verify.elementPresent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit.is-oversold',"cell is oversold")
  }

  this.checkNotOversoldInLaydownGridSpot = function (row, col) {
    return browser
      .verify.elementNotPresent('#laydownGridTable.loaded .day-part-row:nth-child(' + row + ') td:nth-child(' + col + ') input.cell-value-edit.is-oversold',"cell is not oversold")
  }

  this.checkNotOversoldInLaydownGrid = function() {
    for(var coln = 2; coln <9 ; coln++){
      for(var row = 1; row <7 ; row++){
        this.checkNotOversoldInLaydownGridSpot(row, coln);
      }
    }
    return browser;
  }

  this.saveAndContinue = function() {
  	return browser
      .waitForElementVisible('#saveAndContinuePlanButton')
      .click('#saveAndContinuePlanButton')
      .pause(2000)
      .waitForElementVisible('#buttonGeneratePDF');
  }

  this.verifySelectedWeekAndParentRowsAreOversold = function() {
    return browser
      .verify.elementPresent('.tier-two-row.selected-row .spots-cell .is-oversold', 'Selected row has oversold flag')
      .execute(function(){
        var $selectedRow = $('.tier-two-row.selected-row');
        var $previousTierOneRowOversoldCell = $selectedRow.prevAll('.tier-one-row').eq(0).find('.spots-cell .is-oversold');
        return $previousTierOneRowOversoldCell.length > 0;
      }, [],
      function(hasOversoldFlag) {
        browser.verify.equal(hasOversoldFlag.value, true, 'Buying area row has oversold flag')
      })
      .execute(function() {
        var $selectedRow = $('.tier-two-row.selected-row');
        var $previousTierOneRowOversoldCell = $selectedRow.prevAll('.root-row').eq(0).find('.spots-cell .is-oversold');
        return $previousTierOneRowOversoldCell.length > 0;
      }, [],
      function(hasOversoldFlag) {
        browser.verify.equal(hasOversoldFlag.value, true, 'Network row has oversold flag')
      });
  }

  this.clickPlanningObjectivestab = function(){
    return browser
      .waitForElementPresent('#planningObjectivesTab')
      .click('#planningObjectivesTab')
      .waitForElementVisible('#generatePlanButton')
      .saveScreenshot(generateScreenShotFilePath('Planning Objectives page'));
  }

  this.dragAndDropProduct = function(){
    return browser
      .click('ul#optimisationDrawerPopUp > li.lever > h3.lever-name:nth-child(1)')
      .waitForElementPresent('ul#optimisationDrawerPopUp > li.lever-open')
      .waitForElementPresent('ul#optimisationDrawerPopUp > li.lever-open > ul.levels-list > li.ui-draggable')
      .moveToElement('ul#optimisationDrawerPopUp > li.lever-open > ul.levels-list > li.ui-draggable:nth-child(6)',  10,  10)
      .mouseButtonDown(0)
      .pause(500)
      .moveToElement('#highImportanceConstraints',  20,  20) // Move to offset position of 200(x) 600(y)
      .mouseButtonUp(0)
      .pause(5000)
      .saveScreenshot(generateScreenShotFilePath('Planning Objectives drag and drop'));
  }

  this.dragAndDropPreserveLaydownProduct = function(){
    return browser
      .waitForElementPresent('#optimisationDrawerPopUp > li.lever:nth-child(15)')
      .click('#optimisationDrawerPopUp > li.lever:nth-child(15) > h3.lever-name')
      .waitForElementPresent('#optimisationDrawerPopUp > li.lever-open')
      .waitForElementPresent('#optimisationDrawerPopUp > li.lever-open > ul.levels-list > li.ui-draggable')

      // HTML5 Drag & Drop not working in Selenium - https://github.com/SeleniumHQ/selenium-google-code-issue-archive
      .moveToElement('ul#optimisationDrawerPopUp > li.lever-open > ul.levels-list > li.ui-draggable:nth-child(6)',  10,  10)
      .mouseButtonDown(0)
      .pause(500)
      .moveToElement('#highImportanceConstraints',  20,  20) // Move to offset position of 200(x) 600(y)
      .mouseButtonUp(0)
      .pause(5000)

      // Attempted to use html-dnd helper function instead (not in repo or included), but not working due to draggable element being within a list and not being referenced by ID
      //.execute(dragAndDrop, ['#optimisationDrawerPopUp > li.lever-open > ul.levels-list > li.ui-draggable:first-child', '#highImportanceConstraints'])
      //.execute(dragAndDrop, ['#optimisationDrawerPopUp > li.lever-open > ul.levels-list > li.ui-draggable', '#highImportanceConstraints'])
      //.pause(5000)
      //PROMPT USER TO DO THIS MANUALLY INSTEAD

      .saveScreenshot(generateScreenShotFilePath('Planning Objectives drag and drop'));
  }

  this.refreshPlanPage = function() {
    return browser
      .pause(1000)
      .url(function(url){
        browser.url(url);
      });
  }

};
