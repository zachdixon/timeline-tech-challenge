define(['jquery','timeline','timer','eventLoader','utils','text!timeline.json'], function($, Timeline, Timer, EventLoader, Utils, json){
  describe("timeline", function() {
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

    it("should create an event loader during initialization", function(){
        tl.init();
        expect(tl.event_loader instanceof EventLoader).toEqual(true);
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
