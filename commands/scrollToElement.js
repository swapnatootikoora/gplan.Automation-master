exports.command = function(selector, callback) {
    var self = this;
  
    self.execute(function(selector) {
        var element = document.querySelector(selector);
        element.scrollIntoView();
      }, [selector], function(){
        if (typeof callback === "function") {
          callback.call(self);
        }
      });
  
    return this; // allows the command to be chained.
  };