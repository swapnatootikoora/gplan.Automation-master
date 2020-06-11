exports.command = function(selector, index, callback) {
  var self = this;

  var select = self.elements('css selector', selector + ' option', function (response) {
    console.debug('selecting option index init -' + index);

    return selectOption(index);

    ///
    /// Select the option with the specified index
    ///
    function selectOption(optionIndex) {
      console.debug('selecting option index -' + optionIndex);

      self.execute(function(selector, index) {
         var ele = document.querySelector(selector);
         ele.selectedIndex = index;

        return true;
      }, [selector, index], function() {
        self.triggerEvent(selector, 'change', function(){
          if (typeof callback === "function") {
            callback.call(self);
          }
        });
      });
    }

  });


  return this; // allows the command to be chained.
};