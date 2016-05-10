var assert = require('chai').assert;

var ROOT_PATH = './../../';

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