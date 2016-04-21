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
  countdownStart: number;
  startCountdown: Function;
  getRoundViewModel: Function;
}

export interface IRoundVM {
  stage: ROUND_STAGE
  scores: Object;
  letters: ILetter[];
  category: string;
  countdown: number;
  countdownStart: number;
}

export class Round implements IRound {
  
  stage: ROUND_STAGE;
  scores: Object; // Todo IScore?
  letters: ILetter[];
  category: string;
  countdown: number; // In seconds!!!
  countdownStart: number;
  
  private timer: TimerService;
  
  constructor(stage?: ROUND_STAGE, countdownStart?: number) {
    if (stage) {
      this.stage = stage;
    } else {
      this.stage = ROUND_STAGE.ROUND_PRE
    }
    this.setLetters();
    this.countdown = this.countdownStart = countdownStart || 30;
    this.timer = new TimerService();
    this.scores = {};
    this.category = '';
  }
  
  private setLetters():void {
    
    var letterService = new LetterService();
    var numLetters: number;
    
    if (this.stage === ROUND_STAGE.ROUND_1 || this.stage === ROUND_STAGE.FACEOFF_1) {
      numLetters = 3;
    } else if (this.stage === ROUND_STAGE.ROUND_2) {
      numLetters = 4;
    } else if (this.stage === ROUND_STAGE.ROUND_3 || this.stage === ROUND_STAGE.FACEOFF_2) {
      numLetters = 5;
    } else if (this.stage === ROUND_STAGE.ROUND_4) {
      numLetters = 6;
    } else if (this.stage === ROUND_STAGE.ROUND_5 || this.stage === ROUND_STAGE.FACEOFF_1) {
      numLetters = 7;
    } else {
      numLetters = 0;
    }

    if (numLetters) {
      this.letters = letterService.getLetters(numLetters);
    }
  }
  
  getRoundViewModel(): IRoundVM {
    return {
      stage: this.stage,
      scores: this.scores,
      letters: this.letters,
      category: this.category,
      countdown: this.countdown,
      countdownStart: this.countdownStart
    };
  }
  
  // Start the countdown
  startCountdown(updateCallback: Function): void {

    // Set-up the callback that updates Firebase
    this.timer.onTimerTick(() => {
      this.countdown--;
      updateCallback(this.getRoundViewModel());
    });
        
    // Start it!
    this.timer.start(this.countdown * 1000);
  }
}