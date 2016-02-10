var express =     require('express');
var bodyParser =  require('body-parser');
var config =      require('./../config/config');

var app;
var server;

function _start() {
  
  app = express();
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true }));
  
  server = app.listen(config.PORT, function () {
    console.log('Server started');
    console.log('Listening on port %s...', server.address().port);
  });
  
  if (server) {
    return app;  
  } else {
    throw new Error('Server did not start properly');
  }
}

function _getApp() {
  if (app) {
    return app;
  } else {
    throw new Error('App not available');
  }
}

function _getServer() {
  if (server) {
    return server;
  } else {
    throw new Error('Server not available');
  }
}

module.exports = {
  start: _start,
  app: _getApp,
  server: _getServer
};