var assert = require('chai').assert;

// TimerService tests

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

// LetterService tests

describe('LetterService()', function () {
  
  var LetterService = require(ROOT_PATH + 'services/LetterService');

  describe('.getLetters()', function () {
    
    it('should get 3 letters', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(3);
      assert.equal(letters.chars.length, 3);
    });
    
    it('should get 10 letters', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(10);
      assert.equal(letters.chars.length, 10);
    });
    
    it('should get 0 letters', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(0);
      assert.equal(letters.chars.length, 0);
    });
    
    it('should validate words', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(3);
      var padding = '0abc21?';
      var words = '';
      
      for (var i = 0, max = letters.chars.length; i < max; i++) {
        var firstLetter = letters.chars[i];
        words = words + firstLetter + padding + ' ';
      }

      var re = new RegExp(letters.validator, 'gi');
      
      assert.isTrue(re.test(words));
    });
    
    it('should validate one-letter words', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(3);
      var words = letters.chars.join(' ') + '.';

      var re = new RegExp(letters.validator, 'gi');
      
      assert.isTrue(re.test(words));
    });
    
    it('should invalidate due to extra word', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(3);
      var padding = '0abc21?';
      var words = '';
      
      for (var i = 0, max = letters.chars.length; i < max; i++) {
        var firstLetter = letters.chars[i];
        words = words + firstLetter + padding + ' ';
      }
      
      words = words + 'foo';

      var re = new RegExp(letters.validator, 'gi');
      
      assert.isFalse(re.test(words));
    });
    
    it('should invalidate due to missing spaces', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(3);
      var padding = '!!!!buhguh?';
      var words = '';
      
      for (var i = 0, max = letters.chars.length; i < max; i++) {
        var firstLetter = letters.chars[i];
        words = words + firstLetter + padding;
      }
      
      words = words + 'foo';

      var re = new RegExp(letters.validator, 'gi');
      
      assert.isFalse(re.test(words));
    });
    
    it('should valid a phrase with quotations around a word', function () {
      var letterService = LetterService.LetterService;
      var letters = letterService.getLetters(3);
      var padding = 'abcd';
      var words = '';
      
      for (var i = 0, max = letters.chars.length; i < max; i++) {
        var firstLetter = letters.chars[i];
        words = words + "\"" + firstLetter + padding + "\" " ;
      }
      
      console.log('words: ', words);
      console.log('validator', letters.validator);
      
      var re = new RegExp(letters.validator, 'gi');
      assert.isTrue(re.test(words));
    });
    
  });
});

// CategoryService tests

describe('CategoryService', function () {
  
  var _CategoryService = require(ROOT_PATH + 'services/CategoryService');
  var categoryService = _CategoryService.CategoryService;
  
  it('should choose a category', function () {
    var category = categoryService.choose();
    assert.isString(category.category, 'is a string');
    assert.isAbove(category.category.length, 0, 'is non-empty');
  });
  
  it ('should exclude a specific category', function () {
    
    var excluded = 'If you were President?'; // This is the first one in the object
    var notExcluded = true;
    
    // Not the best test, but, todo
    for (var i = 0; i < 100; i++) {
      var c = categoryService.choose([0]);
      if (c.category === excluded) {
        notExcluded = false;
        break;
      }
    }
    
    assert.isTrue(notExcluded);
  });
});