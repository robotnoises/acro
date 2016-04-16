var Timer = require('tocktimer');

// var timer = new Tock({
//   countdown: true,
//   interval: 10,
//   callback: someCallbackFunction,
//   complete: someCompleteFunction
// });

export class TimerService {
  
  private timer: any;
  
  constructor(optionOverrides?: any) {
    
    var options = {
      countdown: true,
      interval: 1000
    };
    
    if (typeof optionOverrides === 'object') {
      options.countdown = optionOverrides.countdown || options.countdown;
      options.interval = optionOverrides.interval || options.interval;
    }
  
    this.timer = new Timer(options);
    this.timer.complete = this.onTimerComplete;
    this.timer.callback = this.onTimerTick;
  }
  
  start(startTime?: number) {

    if (this.timer) {
      var startAt = startTime || 0;
      this.timer.start(startAt);
    } else {
      throw new Error('Timer is undefined.');
    }
  }
  
  pause():number {
    if (this.timer) {
      this.timer.pause();
      return this.timer.pause_time;
    } else {
      throw new Error('Timer is undefined.');
    }
  }
  
  onTimerComplete(cb?: Function) {
    if (this.timer && cb) {
      cb(this.timer);
    }
  }
  
  onTimerTick(cb?: Function) {
    if (this.timer && cb) {
      cb(this.timer);  
    }
  }
}