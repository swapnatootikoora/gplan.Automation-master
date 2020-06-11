exports.command = function(selector, targetValue, callback) {
  	var self = this;

  	self.execute(function(elementSelector, value) {
         $(elementSelector).html(value);
         $(elementSelector).triggerHandler('blur')
      },
      [selector, targetValue],
      function() {
        if (typeof callback === "function") {
          callback.call(self);
        }
      });

  return this; // allows the command to be chained.
};

