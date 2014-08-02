define(['jquery','utils'], function($, Utils){
  var EventLoader = function(path) {
    var that = this;
    // Enables initialization without the 'new' keyword
    if (Object.getPrototypeOf(that) !== EventLoader.prototype) {
      that = Object.create(EventLoader.prototype);
      that.constructor.apply(that, arguments);
    }

    that.json_path = Utils.setDefault(path, 'timeline.json');

    var getJSON = function() {
      $.getJSON(that.json_path, function(response){
        that.events = response;
      });
    }
    return that;
  }
  EventLoader.prototype.getJSON = function() {
    var that = this;
    $.getJSON(that.json_path, function(response){
      that.events = response;
      that.trigger('JSONready');
    });
  }
  return EventLoader;
})
