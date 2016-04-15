import {LetterService} from './LetterService';

// Game BL goes here

export class Game {
  
  rounds: Object;
  state: any;
  
  constructor() {
  }
  
  // @dimension {number} - the # of letters to return
  getLetters(dimension: number) {
    
    var letters = [];
    var letterService = new LetterService();
    
    for (var i = 0; i < dimension; i++) {
      letters.push(letterService.choose());
    }
    
    return letters;
  }
}
