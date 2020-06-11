exports.command = function(selector, optionText, callback) {
  var self = this;

  var select = self.elements('css selector', selector + ' option', function (response) {

    var index = 0;
    console.debug('selecting option lookup ' + optionText);
       

    self.elementIdText(response.value[index].ELEMENT, checkOptionText);

    ///
    /// Check if the select option text matches the specified optionText to find,
    /// if not check the next option until the whole list has been searched
    ///
    function checkOptionText(textResponse) {
      console.debug('selecting option lookup1 ' + textResponse.value +' - ' + optionText);
    
      if (textResponse.value === optionText ) {
        var optionIndex = index;
        console.debug('selecting option ' + optionIndex + ' - ' + optionText);
        self.selectOptionByIndex(selector, optionIndex, function(){
          if (typeof callback === "function") {
            callback.call(self);
          }
        });

        return;
      } else if (index < response.value.length - 1) {
        console.debug('selecting option i ' + index);
        
        self.elementIdText(response.value[++index].ELEMENT, checkOptionText);
      }
      else {
        console.debug('selecting option error ' + index + ' - ' + response.value.length);
        
      }
    }

    // ///
    // /// Select the option with the specified index
    // ///
    // function selectOption(optionIndex, textValue) {
    //   console.debug('selecting option ' + optionIndex + ' - ' + textValue);

    //   self.execute(function(selector, index) {
    //      var ele = document.querySelector(selector);
    //      ele.selectedIndex = index;

    //     return true;
    //   }, [selector, index], function() {
    //     self.triggerEvent(selector, 'change', function(){
    //       if (typeof callback === "function") {
    //         callback.call(self);
    //       }
    //     });
    //   });
    // }

  });


  return this; // allows the command to be chained.
};