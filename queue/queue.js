var Config      = require('./config/Config');
var Auth        = require('./lib/Auth');
var Monitor     = require('./lib/Monitor');
var Dispatcher  = require('./lib/Dispatcher');
var Queue       = require('./lib/Queue');

function _start() {
  Auth(Config.FB_URL, Config.FB_TOKEN).then(function ($firebaseInstance) {
    Dispatcher.start($firebaseInstance, Monitor.paths);
    Queue.start($firebaseInstance);
  }).fail(function (error) {
    console.error(error);
  });
}

module.exports = {
  start: _start
};