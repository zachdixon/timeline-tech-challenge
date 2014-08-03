define(['jquery','utils'], function($, Utils){
  // Controls Timeline state
  //
  var Timer = function(parent) {
    var that = this;
    // Enables initialization without the 'new' keyword
    if (Object.getPrototypeOf(that) !== Timer.prototype) {
      that = Object.create(Timer.prototype);
      that.constructor.apply(that, arguments);
    }
    that.interval_tick = Utils.setDefault(parent.interval, 2000);
    that.state = Timer.STATES.INITIAL;
    that.timeline = parent,
    that.control_glyphicon = that.timeline.control_glyphicon;
  }
  Timer.STATES = {
    'INITIAL': 0,
    'PLAYING': 1,
    'PAUSED': 2,
    'ENDED': 3
  };

  // Change state of timer based on current state
  // Initial -> Playing
  // Playing -> Paused
  // Paused -> Playing
  Timer.prototype.changeState = function() {
    if(!(this instanceof Timer)){
      throw new Error("Must call changeState on Timer");
    }
    var timer = this,
        state = this.state;

    switch(state) {
      case Timer.STATES.INITIAL:
        timer.state = Timer.STATES.PLAYING;
        timer.changeControl('pause');
        timer.play();
        break;
      case Timer.STATES.PLAYING:
        timer.state = Timer.STATES.PAUSED;
        timer.changeControl('play');
        timer.pause();
        break;
      case Timer.STATES.PAUSED:
        timer.state = Timer.STATES.PLAYING;
        timer.changeControl('play');
        timer.play();
        break;
      case Timer.STATES.ENDED:
        timer.state = Timer.STATES.INITIAL;
        timer.changeControl('play');
        timer.reset();
        break;
      default:
        break;
    }
  }

  // Start timer
  Timer.prototype.play = function() {
    this.start_time = new Date();
    this.setTimeout(this.getTimeUntilNextEvent());
    return this;
  }

  // Pause timer and store time left
  Timer.prototype.pause = function() {
    var time_elapsed;
    if(this.timeout !== undefined) {
      time_elapsed = new Date() - this.start_time;
      this.time_until_next_event = this.getTimeUntilNextEvent() - time_elapsed;
      this.clearTimeout();
    }
  }

  // Stop timer
  // called when last event is reached
  Timer.prototype.stop = function() {
    this.changeControl("reset");
    this.clearTimeout();
    this.state = Timer.STATES.ENDED;
  }

  // Reset timer
  // sets state to initial
  Timer.prototype.reset = function() {
    var timeline = this.timeline;
    $(timeline.event_text).text('');
    timeline.eventLoader.setCurrentEvent(0);
  }

  // Set timeout for next event
  Timer.prototype.setTimeout = function(time) {
    var that = this;
    this.timeout = setTimeout(function(){
      that.timeline.changeEvent();
    }, time)
  }

  // Clear current timeout
  Timer.prototype.clearTimeout = function() {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  // Get time left until next event
  Timer.prototype.getTimeUntilNextEvent = function() {
    if(this.timeline.eventLoader == undefined) {
      throw new Error("No eventLoader defined");
    }
    if(this.time_until_next_event !== undefined) {
      return this.time_until_next_event;
    }
    var timer = this,
        timeline = this.timeline,
        eventLoader = timeline.eventLoader,
        current_event = eventLoader.current_event,
        next_event = eventLoader.getNextEvent(),
        time_until_next_event;

    if(next_event !== undefined) {
      time_until_next_event = (next_event.age * timer.interval_tick);
    }
    if(current_event !== undefined) {
      time_until_next_event = time_until_next_event - (current_event.age * timer.interval_tick);

    }
    return time_until_next_event;
  }

  Timer.prototype.changeControl = function(state) {
    var $control = $(this.timeline.control),
        $control_glyphicon = $(this.control_glyphicon);

    if($control_glyphicon === undefined) {
      throw new Error("control_glyphicon is undefined");
    }
    if($control === undefined) {
      throw new Error("control is undefined");
    }
    $control_glyphicon.removeClass('glyphicon-play glyphicon-pause glyphicon-repeat');
    switch(state) {
      case 'play':
        $control.text("Play");
        $control_glyphicon.addClass('glyphicon-play');
        break;
      case 'pause':
        $control.text("Pause");
        $control_glyphicon.addClass('glyphicon-pause');
        break;
      case 'reset':
        $control.text("Reset");
        $control_glyphicon.addClass('glyphicon-repeat');
        break;
      default:
        break;
    }
  }

  return Timer;
});
