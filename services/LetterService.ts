/**
 * LetterService.ts
 * 
 * Randomly choose letters & create regex validator strings.
 * 
 */

export interface ILetters {
  chars: string[];
  validator: string;
  add: Function;
  getLettersViewModel: Function;
}

export interface ILettersVM {
  chars: string[];
  validator: string;
}

export class Letters implements ILetters {
  
  chars: string[];
  validator: string;
  
  constructor() {
    this.chars = [];
    this.validator = '';
  }
  
  private removeLastTwoChars(input: string): string {
    if (input && input.length > 0) {
      return input.slice(0, -2);
    } else {
      return '';
    }
  }

  add(letter: string): void {
    
    let SPACE = '\\s';
    
    this.chars.push(letter);
    // Each time we add to the validator regex, we need to update the existing
    if (this.validator) {
      // We only want a space to be optional after the last word
      this.validator = this.removeLastTwoChars(this.validator) + '+' + `[${letter}]+[^${SPACE}]*${SPACE}*$`;
    } else {
      this.validator = `[${letter}]+[^${SPACE}]*${SPACE}*$`;
    }
  }
  
  getLettersViewModel(): ILettersVM {
    return {
      chars: this.chars,
      validator: this.validator
    };
  }
}

export class LetterService {

  private static getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
  
  // @dimension {number} - the # of letters to return
  static getLetters(dimension: number): ILetters {
    
    var letters = new Letters();
    
    for (var i = 0; i < dimension; i++) {
      var letter = _letters[this.getRandom(Object.keys(_letters).length)];
      letters.add(letter);
    }
    
    return letters;
  }
}

/**
 * _letters
 * 
 * An object literal that approximately represents the frequency of letters occurring as the first letter in English words. 
 * 
 */

// Letter frequency table provided by: 
// https://en.wikipedia.org/wiki/Letter_frequency#Relative_frequencies_of_the_first_letters_of_a_word_in_the_English_language

// a =>	11.602%	
// b =>	4.702%	
// c =>	3.511%	
// d =>	2.670%	
// e =>	2.007%	
// f =>	3.779%	
// g =>	1.950%	
// h =>	7.232%	
// i =>	6.286%	
// j =>	0.597%	
// k =>	0.590%	
// l =>	2.705%	
// m =>	4.383%	
// n =>	2.365%	
// o =>	6.264%	
// p =>	2.545%	
// q =>	0.173%	
// r =>	1.653%	
// s =>	7.755%	
// t =>	16.671%	
// u =>	1.487%	
// v =>	0.649%	
// w =>	6.753%	
// x =>	0.017%	
// y =>	1.620%	
// z =>	0.034%

var _letters = {
  0: 'T', 1: 'T', 2: 'T', 3: 'T', 4: 'T', 5: 'T', 6: 'T', 7: 'T', 8: 'T', 9: 'T', 10: 'T', 11: 'T', 12: 'T', 13: 'T', 14: 'T', 15: 'T', 16: 'T', 
  17: 'A', 18: 'A', 19: 'A', 20: 'A', 21: 'A', 22: 'A', 23: 'A', 24: 'A', 25: 'A', 26: 'A', 27: 'A', 28: 'A',
  29: 'S', 30: 'S', 31: 'S', 32: 'S', 33: 'S', 34: 'S', 35: 'S', 36: 'S',
  37: 'H', 38: 'H', 39: 'H', 40: 'H', 41: 'H', 42: 'H', 43: 'H', 
  44: 'W', 45: 'W', 46: 'W', 47: 'W', 48: 'W', 49: 'W', 50: 'W', 
  51: 'I', 52: 'I', 53: 'I', 54: 'I', 55: 'I', 56: 'I',
  57: 'O', 58: 'O', 59: 'O', 60: 'O', 61: 'O', 62: 'O',
  63: 'B', 64: 'B', 65: 'B', 66: 'B', 67: 'B',
  68: 'M', 69: 'M', 70: 'M', 71: 'M',
  72: 'F', 73: 'F', 74: 'F', 75: 'F', 
  76: 'C', 77: 'C', 78: 'C', 79: 'C', 
  80: 'L', 81: 'L', 82: 'L',
  83: 'D', 84: 'D', 85: 'D',
  86: 'P', 87: 'P', 88: 'P',
  89: 'N', 90: 'N',
  91: 'E', 92: 'E',
  93: 'G', 94: 'G',
  95: 'R', 96: 'R', 
  97: 'Y', 98: 'Y',
  99: 'U',
  100: 'V',
  101: 'K',
  102: 'J',
  103: 'Q',
  104: 'Z',
  105: 'X',
};