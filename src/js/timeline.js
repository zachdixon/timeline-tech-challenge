
// Timeline
// constructor(options)
//  - options = {interval, json_path, }
// initialize:
//  - timer
//  - events
// methods:
//  - play
//  - pause
//  - reset
//  - getEvent
//  - getTime
// 1 year = 2 seconds
// get time for next event, if age is 4, time is 8 seconds, setTimeout for 8 seconds
// when paused, store time left, clearTimeout
// on Play, setTimeout with time left
// rinse and repeat
define(['jquery','timer','eventLoader','utils'], function($, Timer, EventLoader, Utils){


  var Timeline = function(opts) {

    if(typeof opts !== "object") {
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
    opts = Utils.setDefault(opts, {});
    that.wrapper = Utils.setDefault(opts.wrapper, '.timeline-wrapper');
    that.template = Utils.setDefault(opts.template, Timeline.template);
    that.event_text = Utils.setDefault(opts.eventText, '.event-text');
    that.animate = Utils.setDefault(opts.animate, true);
    that.control = Utils.setDefault(opts.control, '.btn-control');
    that.control_glyphicon = Utils.setDefault(opts.controlGlyphicon, '.control-glyphicon');
    that.interval = Utils.setDefault(opts.interval, 2000);
    that.data = Utils.setDefault(opts.data, {firstName: "Foo", lastName: "Bar", age: 21, events: [{age: 0, content: "was born"}]});

    that.timer = new Timer(that);
    that.eventLoader = new EventLoader(that);

    that.init();

  }

  Timeline.template = '<div class="timeline">' +
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

  Timeline.prototype.render = function() {
    $(this.wrapper).append($(this.template));
  }

  Timeline.prototype.attachEventHandlers = function() {
    // Play/pause/reset event listener
    $(this.control).on('click', this.timer.changeState.bind(this.timer));
  }


  Timeline.prototype.changeEvent = function() {
    var event_loader = this.eventLoader,
        timer = this.timer,
        $current_event;
    // Stop timeline if no events left
    if(event_loader.getNextEvent() == false) {
      timer.stop();
      this.button_glyphicon
    }else {
      timer.setTimeout(timer.getTimeUntilNextEvent());
    }
    $current_event = $(this.event_text);
    if(this.animate) {
      $current_event.removeClass('zoomIn').addClass('bounceOutRight');
      $current_event.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.showEvent.bind(this));
    }else {
      this.showEvent();
    }
  }

  Timeline.prototype.showEvent = function() {
    var event_loader = this.eventLoader,
        $event = $(this.event_text)
        next_event = event_loader.getNextEvent();
    $event.text(this.eventLoader.getEventText());
    if(this.animate) {
      $event.addClass('zoomIn');
    }
    event_loader.current_event = next_event;
  }

  Timeline.prototype.init = function() {
    this.render();
    this.attachEventHandlers();
  }



  return Timeline;
});
