var letterService = require('./letterService');

// Game BL goes here

// @dimension {number} - the # of letters to return

function _getLetters(dimension) {
  
  var letters = [];
  
  for (var i = 0; i < dimension; i++) {
    letters.push(letterService.choose());
  }
  
  return letters;
}

module.exports = {
  getLetters: _getLetters
}