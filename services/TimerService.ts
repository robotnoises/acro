var Timer = require('tocktimer');

// var timer = new Tock({
//   countdown: true,
//   interval: 10,
//   callback: someCallbackFunction,
//   complete: someCompleteFunction
// });

export class TimerService {
  
  timer: any;
  
  constructor(options) {
    
    var defaultOptions = {
      countdown: true,
      interval: 1000
    };
    
    if (typeof options === 'object') {
      options.countdown = options.countdown || defaultOptions.countdown;
      options.interval = options.interval || defaultOptions.interval;
    }
  
    this.timer = new Timer(options);
  }
  
  start() {
    if (this.timer) {
      this.timer.start();
    } else {
      throw new Error('Timer is undefined.');
    }
  }
}