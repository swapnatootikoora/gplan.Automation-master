exports.command = function(selector, rowText, callback) {
  var self = this;

  var tableRows = self.elements('css selector', selector + ' tr', function (response) {

    var index = 0;
    console.debug('selectTableRow ' + selector + ' - ' + rowText);
     
    self.elementIdText(response.value[index].ELEMENT, checkRowText);

    ///
    /// Check if the row text matches the specified rowText to find,
    /// if not check the next row until the whole table has been searched
    ///
    function checkRowText(textResponse) {
      console.debug('textResponse.value ' + textResponse.value);
      var valueToTest = textResponse.value.replace(/\s\s+/g, ' ');
      console.debug('valueToTest ' + valueToTest);

      var isMatch = valueToTest.indexOf(rowText) > -1; 
      console.debug('Matches: ' + isMatch);


      if (isMatch) {
        clickRow(index);
        return;
      } else if (index < response.value.length - 1) {
        self.elementIdText(response.value[++index].ELEMENT, checkRowText);
      }

    }

    ///
    /// Select the row with the specified index
    ///
    function clickRow(optionIndex) {
      console.debug('selectTableRow ' + selector + ' : ' + optionIndex);
      self.selectTableRowByIndex(selector, optionIndex + 1, function(){
        if (typeof callback === "function") {
          callback.call(self);
        }
      });
    }
  });


  return this; // allows the command to be chained.
};