
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
    var that = this,
        opts,
        changeState;
    // Enables initialization without the 'new' keyword
    if (Object.getPrototypeOf(that) !== Timeline.prototype) {
      that = Object.create(Timeline.prototype);
      that.constructor.apply(that, arguments);
    }
    opts = Utils.setDefault(opts, {});
    that.wrapper = Utils.setDefault(opts.wrapper, '.timeline');
    that.event_text = Utils.setDefault(opts.eventText, '.event-text');
    that.control = Utils.setDefault(opts.control, '.btn-control');
    that.control_glyphicon = Utils.setDefault(opts.controlGlyphicon, '.control-glyphicon');
    that.inverval = Utils.setDefault(opts.interval, 2000);
    that.data = Utils.setDefault(opts.data, {firstName: "Foo", lastName: "Bar", age: 21, events: [{age: 0, content: "was born"}]});

    that.timer = new Timer(that.interval);
    that.eventLoader = new EventLoader(that.json_path);


    // Play/pause/reset event listener
    changeState = function(e){
      e.preventDefault();
      var $btn = $(e.currentTarget),
          state = $btn.attr('data-state');
      if(state === undefined || state === 'paused') {

      }

    }

    // Play/pause/reset event listener
    $(that.control).on('click', changeState.bind(that));
    return that;
  }




  return Timeline;
});
