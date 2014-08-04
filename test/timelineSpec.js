"use strict";

define(['jquery','timeline','timer','eventLoader','utils','text!timeline.json'], function($, Timeline, Timer, EventLoader, Utils, json){
  describe("Timeline", function() {
    var tl = new Timeline({
      data: $.parseJSON(json),
      delay: 2000
    });

    beforeEach(function(){
      spyOn(tl, 'init').andCallThrough();
    });

    afterEach(function() {
      tl.reset();
    });

    it("should be able to initialize", function() {
      expect(tl.init).toBeDefined();
      tl.init();
      expect(tl.init).toHaveBeenCalled();
    });

    it("should handle non-objects in params", function() {
      expect(function(){ new Timeline("test"); }).toThrow(new Error("Illegal parameter passed to Timeline"));
    });

    describe("initialize", function() {
      beforeEach(function() {
        tl.init();
      });

      afterEach(function() {
        tl.reset();
      });

      it("should create an event loader", function(){
        expect(tl.eventLoader instanceof EventLoader).toBeTruthy();
      });

      it("should create a timer", function() {
        expect(tl.timer instanceof Timer).toBeTruthy();
      });

      // FIXME - Need to get jasmine-jquery working

      // it("should render the timeline's template", function() {
      //   expect($(tl.wrapper)).toContainHtml(tl.template);
      // });

      // it("should attach event handlers", function() {
      //   var spy = spyOnEvent(tl.control, 'click');
      //   $(tl.control).trigger('click');
      //
      //   expect('click').tohaveBeenTriggeredOn(tl.control);
      //   expect(spy).toHaveBeenTriggered();
      // });
    });

    describe("default values", function() {
      beforeEach(function() {
        tl.init();
      });
      afterEach(function() {
        tl.reset();
      });
      it("should have state defined", function() {
        expect(tl.state).toBeDefined();
      });
      it("should have wrapper defined", function() {
        expect(tl.wrapper).toBeDefined();
      });
      it("should have template defined", function() {
        expect(tl.template).toBeDefined();
      });
      it("should have event_text defined", function() {
        expect(tl.event_text).toBeDefined();
      });
      it("should have animate defined", function() {
        expect(tl.animate).toBeDefined();
      });
      it("should have control defined", function() {
        expect(tl.control).toBeDefined();
      });
      it("should have control_glyphicon defined", function() {
        expect(tl.control_glyphicon).toBeDefined();
      });
      it("should have delay defined", function() {
        expect(tl.delay).toBeDefined();
      });
      it("should have callback defined", function() {
        expect(tl.callback).toBeDefined();
      });
      it("should have data defined", function() {
        expect(tl.data).toBeDefined();
      });

    });

    describe("changing states", function() {
      beforeEach(function() {
        tl.init();
      });
      afterEach(function() {
        tl.reset();
      });

      it("should be in initial state", function() {
        expect(tl.state).toEqual(Timeline.STATES.INITIAL);
      });

      it("should change to playing state", function() {
        tl.changeState();
        expect(tl.state).toEqual(Timeline.STATES.PLAYING);
      });

      it("should change to paused state", function() {
        tl.changeState();//playing
        tl.changeState();//paused
        expect(tl.state).toEqual(Timeline.STATES.PAUSED);
      });
    });

    it("should have a changeEvent function", function() {
      expect(tl.changeEvent).toBeDefined();
    });

    describe("changing an event", function() {
      beforeEach(function() {
        tl.init();
      });
      afterEach(function() {
        tl.reset();
      });

      it("should have a current event", function() {
        tl.changeState();
        expect(tl.eventLoader.current_event).toBeDefined();
      });

      it("should go to the next event", function() {
        var current, next;

        tl.changeEvent();

        current = tl.eventLoader.current_event;
        next = tl.eventLoader.getNextEvent();

        expect(tl.eventLoader.getNextEvent()).toEqual(next);
      });
    });

    it("should have a showEvent function", function() {
      expect(tl.showEvent).toBeDefined();
    });

    it("should get the time until the next event", function() {
      expect(tl.timeUntilNextEvent()).toEqual(tl.eventLoader.events[0].age * tl.delay);
    });

    // describe("appending strings", function() {
    //   it("should be able to append 2 strings", function() {
    //       expect(myfunc.append).toBeDefined();
    //   });
    //   it("should append 2 strings", function() {
    //       expect(myfunc.append('hello','world')).toEqual('hello world');
    //   });
    // });
  });
});
