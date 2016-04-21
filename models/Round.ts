import {LetterService, ILetter} from './../services/LetterService';
import {TimerService}           from './../services/TimerService';

export enum ROUND_STAGE {
  ROUND_PRE,
  ROUND_1, 
  ROUND_2, 
  ROUND_3, 
  ROUND_4, 
  ROUND_5,
  FACEOFF_1, 
  FACEOFF_2, 
  FACEOFF_3,
  FACEOFF_WINNER
}

export interface IRound {
  stage: ROUND_STAGE
  scores: Object;
  letters: ILetter[];
  category: string;
  countdown: number;
}

export class Round implements IRound {
  
  stage: ROUND_STAGE;
  scores: Object; // Todo IScore?
  letters: ILetter[];
  category: string;
  countdown: number;
  
  constructor(stage?: ROUND_STAGE) {
    if (stage) {
      this.stage = stage;
    } else {
      this.stage = ROUND_STAGE.ROUND_PRE
    }
    // Todo: temp
    this.countdown = 60;
    this.setLetters();
  }
  
  private setLetters():void {
    
    var letterService = new LetterService();
    var numLetters: number;
    
    if (ROUND_STAGE.ROUND_1 || ROUND_STAGE.FACEOFF_1) {
      numLetters = 3;
    } else if (ROUND_STAGE.ROUND_2) {
      numLetters = 4;
    } else if (ROUND_STAGE.ROUND_3 || ROUND_STAGE.FACEOFF_2) {
      numLetters = 5;
    } else if (ROUND_STAGE.ROUND_4) {
      numLetters = 6;
    } else if (ROUND_STAGE.ROUND_5 || ROUND_STAGE.FACEOFF_1) {
      numLetters = 7;
    } else {
      numLetters = 0;
    }

    if (numLetters) {
      this.letters = letterService.getLetters(numLetters);
      console.log('The letters...', this.letters);
    }
  }
  
  // Update the countdown
  updateCountdown(operand: string, callback?: Function):void {
    var o = parseInt(operand, 10);
    var newCount = 0;
    
    if (this.countdown > 0) {
      newCount = this.countdown + o;
      this.countdown = newCount;
    }
    
    if (callback) {
      callback(newCount);
    }
  }
  
  // Push to Firebase
  push() {
    // Todo: push to Firebase? 
  }
}