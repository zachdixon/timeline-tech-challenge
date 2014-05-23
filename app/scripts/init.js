(function() {

  'use strict';

  require.config({
    paths: {
      underscore : '../vendor/underscore',
      backbone : '../vendor/backbone',
      jquery : '../vendor/jquery'
    }
  });

  require(['underscore', 'backbone', 'jquery'], function() {

    require([ 'app' ], function(app) {});

  });

}());
