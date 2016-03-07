var Timer = require('tocktimer');

// var timer = new Tock({
//   countdown: true,
//   interval: 10,
//   callback: someCallbackFunction,
//   complete: someCompleteFunction
// });

function _new(options) {
  
  var defaultOptions = {
    countdown: true,
    interval: 1000
  };
  
  if (typeof options === 'object') {
    options.countdown = options.countdown || defaultOptions.countdown;
    options.interval = options.interval || defaultOptions.interval;
  }
  
  return new Timer(options);
}

module.exports = {
  new: _new
};