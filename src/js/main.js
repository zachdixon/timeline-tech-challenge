require.config({
  paths: {
    jquery: '../../lib/jquery',
    text: '../../lib/text'
  }
});

define(['jquery','timeline','text!timeline.json'],function($, Timeline, json){
  window.timeline = new Timeline({
    data: $.parseJSON(json)
  });
});
