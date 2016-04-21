var Timer = require('tocktimer');

interface IOptions {
  countdown: boolean;
  interval: number;
}

export class TimerService {
  
  private timer: any;
  private options: Object;
  
  constructor(optionOverrides?: IOptions) {
    var options = this.setOptions(optionOverrides);
    this.timer = new Timer(options);
  }
  
  private setOptions(optionOverrides?: IOptions):Object {
    
    var options = {
      countdown: true,
      interval: 1000
    };
    
    if (typeof optionOverrides === 'object') {
      options.countdown = optionOverrides.countdown || options.countdown;
      options.interval = optionOverrides.interval || options.interval;
    }
    
    return options;
  }
  
  start(startTime?: number) {
    var startAt = startTime || 0;
    this.timer.start(startAt);
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
    var elapsed = Math.floor(this.timer.time / 1000);
    return (elapsed >= 0) ? elapsed : 0;
  }
  
  reset(newOptions?: IOptions) {
    
    this.timer = null;
    
    if (newOptions) {
      var options = this.setOptions(newOptions);
      this.timer = new Timer(options);    
    } else {
      this.timer = new Timer(this.options);
    }
  }
  
  onTimerComplete(cb: Function) {
    this.timer.complete = cb;
  }
  
  onTimerTick(cb: Function) {
    this.timer.callback = cb;
  }
}