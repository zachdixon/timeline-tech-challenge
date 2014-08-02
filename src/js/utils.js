define([''],function(){
  var Utils = {
    setDefault : function(attr, def) {
      return typeof attr !== 'undefined' ? attr : def;
    }
  };
  return Utils;
});
