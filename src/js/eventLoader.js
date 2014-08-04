define(['utils'], function(Utils) {
  var EventLoader = function(data) {
    if(data == undefined || typeof data !== "object") {
      throw new Error("Missing JSON data");
    }
    if(data.firstName == undefined) {
      throw new Error("Missing first name");
    }
    if(data.lastName == undefined) {
      throw new Error("Missing last name");
    }
    if(data.age == undefined) {
      throw new Error("Missing age");
    }
    if(data.events == undefined) {
      throw new Error("Missing events");
    }
    var that = this;
    // Enables initialization without the 'new' keyword
    if (Object.getPrototypeOf(that) !== EventLoader.prototype) {
      that = Object.create(EventLoader.prototype);
      that.constructor.apply(that, arguments);
    }

    that.person = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age
    };
    that.events = data.events
    that.current_event;
  }

  EventLoader.prototype.next = function() {
    this.current_event = this.getNextEvent();
  }

  EventLoader.prototype.reset = function() {
    this.current_event = undefined;
  }


  // Get the next event
  // returns false if no more events
  EventLoader.prototype.getNextEvent = function() {
    var events = this.events,
        current_event = this.current_event,
        current_event_index,
        last_event_index = (events.length - 1),
        next_event;
    if(current_event === undefined) {
      this.setCurrentEvent(0);
      next_event = events[0]; //return first event if it doesn't have a current one
    }else {
      current_event_index = events.indexOf(current_event);
    }
    if(current_event_index === last_event_index) {
      next_event = false; // return false if current event is the last event
    }else {
      next_event = events[current_event_index + 1]; // return next event
    }
    return next_event;
  }

  // Set the current event and returns the event
  EventLoader.prototype.setCurrentEvent = function(index) {
    var event = this.events[index];
    this.current_event = event;
    return event;
  }

  // Get the current event's formatted text
  EventLoader.prototype.getEventText = function() {
    var current_event = this.current_event,
        event_text;
    event_text = "At age " +
                  current_event.age +
                  ", " +
                  this.person.firstName +
                  " " +
                  current_event.content;
    return event_text;
  }

  return EventLoader;
})
