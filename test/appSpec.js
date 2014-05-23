define(function(require) {
  'use strict';

  var app = require('app/scripts/app');

  describe('app', function() {

    it('returns an object', function() {
      expect(app).toEqual(jasmine.any(Object));
    });

  });

});
