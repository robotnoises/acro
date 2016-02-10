var express = require('express');
var routes =  require('./routes');

function _start(app) {
  
  var router = express.Router();
  
  app.use('/api', router);
  
  routes.init(router);
}

module.exports = {
  start: _start
};