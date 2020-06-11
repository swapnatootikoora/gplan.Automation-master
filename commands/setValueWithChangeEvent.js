exports.command = function(selector, targetValue, callback) {
  	var self = this;

  	self.execute(function(elementSelector, value) {
         $(elementSelector).val(value);
         $(elementSelector).triggerHandler('change')
      },
      [selector, targetValue],
      function() {
        if (typeof callback === "function") {
          callback.call(self);
        }
      });

  return this; // allows the command to be chained.
};

