(function() {
  var express = require('express'),
      path = require('path'),
      ejs = require('ejs'),
      app = express();


  app.use('/app', express.static(path.resolve('app')));
  app.use('/test', express.static(path.resolve('test')));
  app.use('/data', express.static(path.resolve('data')));
  app.use('/.grunt', express.static(path.resolve('.grunt')));

  app.engine('html', ejs.__express);
  app.set('views', path.resolve('app'));
  app.set('view engine', 'html');

  app.get('/', function(req, res) {
    return res.render('index');
  });

  app.get(/(\/specs)|(_SpecRunner.html)/, function(req, res) {
    res.sendfile('_SpecRunner.html');
  });

  module.exports = app;

}());
