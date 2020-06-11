exports.command = function(selector, index, callback) {
  var self = this;

  var select = self.elements('css selector', selector + ' tr', function (response) {
    console.debug('selecting table row index init -' + index);

    return selectTableRow(index);

    ///
    /// Select the table row with the specified index
    ///
    function selectTableRow(Index) {
      console.debug('selecting table row index -' + index);

      self.execute(function(selector, index) {
        console.log('ere');
        try{
         var ele = document.querySelector(selector + ' tr:nth-child(' + index + ')');
         
         $(ele).trigger('click');
        } catch(ex){
          console.error(ex);
          throw ex;
        }

        return true;
      }, [selector, index], function() {
          if (typeof callback === "function") {
            callback.call(self);
          }
      });
    }
  });


  return this; // allows the command to be chained.
};