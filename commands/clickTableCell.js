exports.command = function(selector, row, column, callback) {
  var self = this;

  self.click(selector + ' tr:nth-child(' + row + ') td:nth-child(' + column + ')', function() {

    if (typeof callback === "function") {
      callback.call(self);
    }
  });

  return this; // allows the command to be chained.
};