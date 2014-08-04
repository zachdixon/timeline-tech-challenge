define(['utils','timer'], function(Utils, Timer){
  describe("Timer", function() {
    var timer = new Timer(function(){});
    it("should initialize", function() {
      expect(Timer).toBeDefined();
      expect(timer instanceof Timer).toBeTruthy();
    });

    it("should handle missing callback", function() {
      expect(function(){ new Timer(); }).toThrow(new Error("Must provide a callback function to Timer"));
    });

    it("should be able to resume", function() {
      timer.resume();
      expect(timer.start_time).toEqual(new Date());
      expect(timer.timeout).toEqual(jasmine.any(Number));
    });

    it("should be able to pause", function() {
      timer.resume();
      expect(timer.timeout).toBeDefined();
      timer.pause();
      expect(timer.timeout).toBeUndefined();
    });

    it("should handle no timeout when trying to pause", function() {
      expect(function(){timer.pause();}).toThrow(new Error("Nothing to pause"));
    });

    it("should be able to reset", function() {
      expect(timer.remaining).toEqual(0);
      timer.reset();
      expect(timer.remaining).toBeUndefined();
    });

    describe("default values", function() {
      beforeEach(function(){
        timer = new Timer(function(){});
      });
      afterEach(function() {
        timer.reset();
      });

      it("should have a remaining time", function() {
        expect(timer.remaining).toBeDefined();
      });

      it("should have a delay defined", function() {
        expect(timer.delay).toBeDefined();
      });
    });


  });
});
