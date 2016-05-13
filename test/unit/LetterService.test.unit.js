var assert = require('chai').assert;

var ROOT_PATH = './../../';

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