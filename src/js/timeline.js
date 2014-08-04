
define(['jquery','timer','eventLoader','utils'], function($, Timer, EventLoader, Utils){


  var Timeline = function(opts) {

    if(typeof opts !== "object" && opts !== undefined) {
      throw new Error("Illegal parameter passed to Timeline");
    }

    // Instance variables
    var that = this,
        opts;

    // Enables initialization without the 'new' keyword
    if (Object.getPrototypeOf(that) !== Timeline.prototype) {
      that = Object.create(Timeline.prototype);
      that.constructor.apply(that, arguments);
    }

    // Set defaults and define instance variables
    opts                   = Utils.setDefault(opts, {});
    that.state             = Timeline.STATES.INITIAL;
    that.wrapper           = Utils.setDefault(opts.wrapper, '.timeline-wrapper');
    that.template          = Utils.setDefault(opts.template, Timeline.TEMPLATE);
    that.event_text        = Utils.setDefault(opts.eventText, '.event-text');
    that.animate           = Utils.setDefault(opts.animate, true);
    that.control           = Utils.setDefault(opts.control, '.btn-control');
    that.control_glyphicon = Utils.setDefault(opts.controlGlyphicon, '.control-glyphicon');
    that.delay             = Utils.setDefault(opts.delay, 2000);
    that.callback          = Utils.setDefault(opts.callback, that.changeEvent);
    that.data              = Utils.setDefault(opts.data, {firstName: "Foo", lastName: "Bar", age: 21, events: [{age: 0, content: "was born"}]});

    // that.eventLoader = new EventLoader(that.data);
    // that.timer       = new Timer(that.callback.bind(that), that.delay, that.timeUntilNextEvent());

    that.init();

  }

  Timeline.TEMPLATE = '<div class="timeline">' +
    '<div class="event">' +
      '<p class="event-text animated zoomIn"></p>' +
      '<div class="circle_btn_wrapper">' +
        '<a href="#" class="circle_btn btn-control"></a>' +
        '<label class="circle_btn_label">' +
          '<i class="icon-off"></i>' +
          '<span class="glyphicon glyphicon-play control-glyphicon"></span>' +
        '</label>' +
      '</div>' +
    '</div>' +
  '</div>';

  Timeline.STATES = {
    'INITIAL' : 0,
    'PLAYING' : 1,
    'PAUSED'  : 2,
    'ENDED'   : 3
  }

  Timeline.prototype.render = function() {
    $(this.wrapper).append($(this.template));
  }

  Timeline.prototype.attachEventHandlers = function() {
    // Play/pause/reset event listener
    $(this.control).on('click', this.changeState.bind(this));
  }

  Timeline.prototype.changeState = function() {

    var timeline = this,
        // timer    = new Timer(timeline.changeEvent, timeline.delay, timeline.timeUntilNextEvent()),
        timer    = this.timer,
        state    = this.state;

    switch(state) {
      case Timeline.STATES.INITIAL:
        timeline.state = Timeline.STATES.PLAYING;
        timeline.changeControl('pause');
        // timer = new Timer(timeline.callback.bind(timeline), timeline.delay, timeline.timeUntilNextEvent());
        timer.resume();
        break;
      case Timeline.STATES.PLAYING:
        timeline.state = Timeline.STATES.PAUSED;
        timeline.changeControl('play');
        timer.pause();
        break;
      case Timeline.STATES.PAUSED:
        timeline.state = Timeline.STATES.PLAYING;
        timeline.changeControl('pause');
        timer.resume();
        break;
      case Timeline.STATES.ENDED:
        timeline.reset();
        break;
      default:
        break;
    }
  }

  // Changes play/pause/reset icon/text based on passed state
  Timeline.prototype.changeControl = function(state) {
    var $control = $(this.control),
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

  // Changes to next event
  // Hides to shown event, sets a new timer for the next event,
  // and calls showEvent to show the new event
  // Stops timeline if no more events
  Timeline.prototype.changeEvent = function() {
    var $current_event;
    // Stop timeline if no events left
    if(this.eventLoader.getNextEvent() == false) {
      this.state = Timeline.STATES.ENDED;
      this.changeControl('reset');
    }else { // else start timer for next event
      this.timer = new Timer(this.callback.bind(this), this.delay, this.timeUntilNextEvent());
      this.timer.resume();
    }
    $current_event = $(this.event_text);

    // if animation is enabled
    if(this.animate) {
      $current_event.removeClass('zoomIn').addClass('bounceOutRight');
      $current_event.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.showEvent.bind(this));
    }else {
      this.showEvent();
    }
  }

  // Show the current event's text
  Timeline.prototype.showEvent = function() {
    var event_loader = this.eventLoader,
        $event = $(this.event_text);
    $event.text(event_loader.getEventText());
    // if animation is enabled
    if(this.animate) {
      $event.addClass('zoomIn');
    }
    event_loader.next(); // change the current event
  }

  // Returns the time until the next event should show
  // time = (next_event.age * this.delay) - (current_event.age * this.delay)
  Timeline.prototype.timeUntilNextEvent = function() {
    var event_loader = this.eventLoader,
        current_event = event_loader.current_event,
        next_event = event_loader.getNextEvent(),
        time = 0;
    if(next_event !== undefined) {
      time = next_event.age * this.delay;
    }
    if(current_event !== undefined) {
      time -= (current_event.age * this.delay);
    }
    return time;
  }

  Timeline.prototype.reset = function() {
    this.state = Timeline.STATES.INITIAL;
    $(this.event_text).text("");
    this.eventLoader = new EventLoader(this.data);
    this.changeControl('play');
    this.timer.reset();
  }


  Timeline.prototype.init = function() {
    this.eventLoader = new EventLoader(this.data);
    this.timer = new Timer(this.callback.bind(this), this.delay, this.timeUntilNextEvent())
    this.render();
    this.attachEventHandlers();
  }

  return Timeline;
});
