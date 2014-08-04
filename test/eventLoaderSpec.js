define(['utils','eventLoader'], function(Utils, EventLoader){
  describe("Event Loader", function() {
    var JSON = {
      firstName: "First",
      lastName: "Last",
      age: 21,
      events: [
        {age: 0, content: "was born"},
        {age: 4, content: "turned 4"}
      ]
    }
    var event_loader;

    beforeEach(function(){
      event_loader = new EventLoader(JSON);
    });

    afterEach(function(){
      event_loader.reset();
    });

    describe("initialization errors", function() {
      it("should handle no json data passes", function() {
        expect(function(){new EventLoader();}).toThrow(new Error("Missing JSON data"));
      });

      it("should handle missing first name", function() {
        var json = Utils.clone(JSON);
        delete json['firstName'];
        expect(function(){new EventLoader(json);}).toThrow(new Error("Missing first name"));
      });

      it("should handle missing last name", function() {
        var json = Utils.clone(JSON);
        delete json['lastName'];
        expect(function(){new EventLoader(json);}).toThrow(new Error("Missing last name"));
      });

      it("should handle missing age", function() {
        var json = Utils.clone(JSON);
        delete json['age'];
        expect(function(){new EventLoader(json);}).toThrow(new Error("Missing age"));
      });

      it("should handle missing events", function() {
        var json = Utils.clone(JSON);
        delete json['events'];
        expect(function(){new EventLoader(json);}).toThrow(new Error("Missing events"));
      });
    });



    it("should be able to set the current event", function() {
      expect(event_loader.setCurrentEvent).toBeDefined();
      event_loader.setCurrentEvent(1);
      expect(event_loader.current_event).toBe(JSON.events[1]);
    });

    it("should be able to reset", function() {
      event_loader.setCurrentEvent(0);
      expect(event_loader.current_event).toEqual(JSON.events[0]);
      event_loader.reset();
      expect(event_loader.current_event).toBeUndefined();
    });

    it("should get the next event", function() {
      event_loader.setCurrentEvent(0);
      expect(event_loader.getNextEvent()).toEqual(JSON.events[1]);
    });

    it("should be able to change to the next event", function() {
      event_loader.setCurrentEvent(0);
      event_loader.next()
      expect(event_loader.current_event).toEqual(JSON.events[1]);
    });

    it("should get the event's text", function() {
      var current_event = JSON.events[1],
          event_text = "At age " +
                    current_event.age +
                    ", " +
                    JSON.firstName +
                    " " +
                    current_event.content;
      event_loader.setCurrentEvent(1);
      expect(event_loader.getEventText()).toEqual(event_text);
    });


  });

});
