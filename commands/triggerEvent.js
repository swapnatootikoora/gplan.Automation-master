exports.command = function(selector, domEvent, callback) {
  	var self = this;

  	self.execute(function(elementSelector, eventName) {
         $(elementSelector).triggerHandler(eventName)
      },
      [selector, domEvent],
      function() {
        if (typeof callback === "function") {
          callback.call(self);
        }
      });

  return this; // allows the command to be chained.
};

