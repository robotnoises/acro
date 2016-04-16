var Timer = require('tocktimer');

interface IOptions {
  countdown: boolean;
  interval: number;
}

export class TimerService {
  
  private timer: any;
  private options: Object;
  
  constructor(optionOverrides?: IOptions) {
    this.setOptions(optionOverrides, function (options) {
      this.timer = new Timer(options);
      this.timer.complete = this.onTimerComplete;
      this.timer.callback = this.onTimerTick;
    }.bind(this));
  }
  
  private setOptions(optionOverrides?: IOptions, callback?: Function) {
    
    var options = {
      countdown: true,
      interval: 1000
    };
    
    if (typeof optionOverrides === 'object') {
      options.countdown = optionOverrides.countdown || options.countdown;
      options.interval = optionOverrides.interval || options.interval;
    }
    
    if (callback) {
      callback(options);
    }
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
  
  getElapsed() {
    return this.timer.time;
  }
  
  reset(newOptions?: IOptions) {
    
    this.timer = null;
    
    if (newOptions) {
      this.setOptions(newOptions, function (options) {
        this.timer = new Timer(options);  
      }.bind(this));  
    } else {
      this.timer = new Timer(this.options);
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