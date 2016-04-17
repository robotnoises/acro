import {LetterService} from './LetterService';
import {Round} from './../models/Round';

// Game BL goes here

export class Game {
  
  currentRound: Object;
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
