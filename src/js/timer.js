define(['utils'], function(Utils){
  var Timer = function(interval) {
    var STATES = {
      'ENDED': 0,
      'PLAYING': 1,
      'PAUSED': 2
    };
    var that = this;
    // Enables initialization without the 'new' keyword
    if (Object.getPrototypeOf(that) !== Timer.prototype) {
      that = Object.create(Timer.prototype);
      that.constructor.apply(that, arguments);
    }
    that.interval_tick = Utils.setDefault(interval, 2000);
    that.start_time = (new Date()).getTime();
    that.state = STATES.PLAYING;
    return that;
  }

  Timer.prototype.changeState = function() {

  }

  return Timer;
})
