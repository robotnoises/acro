var assert = require('chai').assert;

var ROOT_PATH = './../../';

describe('TimerService', function() {
  
  describe('new TimerService()', function () {
    
    var TimerService = require(ROOT_PATH + 'services/TimerService');
    
    it('should define a TockTimer Object', function () {
      var Service = new TimerService.TimerService();
      assert.isObject(Service.timer);
    });
    
    it('should count down ~ 100ms', function (done) {
      
      var Service = new TimerService.TimerService({interval: 100});
      var startAt = 500;
      
      Service.start(startAt); // start @ 500ms, counting down
      
      setTimeout(function () {
        
        var stoppedAt = Service.pause();
        
        // Make sure it ticked-down ~ 100ms
        assert.isAbove(stoppedAt, 0);
        assert.isBelow(stoppedAt, startAt);
        done();
      }.bind(this), 100);
    });
    
    it('should callback after finished', function (done) {
      
      var Service = new TimerService.TimerService({interval: 10});
      var startAt = 100;
      
      // Count down starting @ 100 ms
      Service.start(startAt);
      Service.onTimerComplete(function () {
        done();
      });
    });
    
    it('should callback after tick', function (done) {
      
      var Service = new TimerService.TimerService({interval: 50});
      var startAt = 100;
      
      // Count down starting @ 100ms
      Service.start(startAt);

      Service.onTimerTick(function (timer) {
        var stoppedAt = Service.pause();
        assert.isAbove(stoppedAt, 0);
        assert.isBelow(stoppedAt, startAt + 1);
        done();
      }.bind(this));
    });
    
    it('should tick 3 times', function (done) {
      
      var Service = new TimerService.TimerService({interval: 100});
      var startAt = 1000;
      
      // Count down starting @ 100ms
      Service.start(startAt);
      
      var numTicks = 0;
      
      Service.onTimerTick(function () {
        numTicks++;
        if (numTicks === 3) {
          done();
        }
      }.bind(this));
    });
    
    it('should reset', function (done) {
      
      var Service = new TimerService.TimerService({interval: 10});
      var startAt = 100;
      
      // Count down starting @ 100ms
      Service.start(startAt);
      
      setTimeout(function () {
        var stoppedAt = Service.pause();
        Service.reset();
        assert.isAbove(stoppedAt, 0);           // The Original Timer started
        assert.isBelow(stoppedAt, startAt);     // It counted down
        assert.equal(Service.getElapsed(), 0);  // It was reset
        done();
      }, 10);
    });
  });
  
});