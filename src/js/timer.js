define(['utils'], function(Utils){
  // Reusable timer
  // Utilizes setTimeout for next event
  // Accurate to 1 ms
  var Timer = function(callback, delay, remaining) {
    if(callback === undefined) {
      throw new Error("Must provide a callback function to Timer");
    }
    var that = this;
    // Enables initialization without the 'new' keyword
    if (Object.getPrototypeOf(that) !== Timer.prototype) {
      that = Object.create(Timer.prototype);
      that.constructor.apply(that, arguments);
    }
    that.delay = Utils.setDefault(delay, 2000);
    that.remaining = Utils.setDefault(remaining, 0);
    that.callback = callback;
  }

  // Start timer
  Timer.prototype.resume = function() {
    this.start_time = new Date();
    this.timeout = setTimeout(this.callback, this.remaining)
    return this;
  }

  // Pause timer and store the remaining time
  Timer.prototype.pause = function() {
    var time_elapsed;
    if(this.timeout !== undefined) {
      time_elapsed = new Date() - this.start_time;
      this.remaining -= time_elapsed;
      this.clearTimeout();
    }else {
      throw new Error("Nothing to pause");
    }
  }

  Timer.prototype.reset = function() {
    this.remaining = undefined;
    this.clearTimeout();
  }

  // Clear current timeout
  Timer.prototype.clearTimeout = function() {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  return Timer;
});
