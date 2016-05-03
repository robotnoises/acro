import {LetterService, ILettersVM}  from './../services/LetterService';
import {TimerService}               from './../services/TimerService';

export enum ROUNDTYPE {
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
  current: ROUNDTYPE
  scores: Object;
  letters: ILettersVM;
  update: Function;
  done: Function;
  category: string;
  countdown: number;
  countdownStart: number;
  start: Function;
  getRoundViewModel: Function;
  next: Function;
  playing: boolean;
}

export interface IRoundVM {
  current: ROUNDTYPE
  scores: Object;
  letters: ILettersVM;
  category: string;
  countdown: number;
  countdownStart: number;
  playing: boolean;
}

export class Round implements IRound {
  
  current: ROUNDTYPE;
  scores: Object; // Todo IScore?
  letters: ILettersVM;
  update: Function;
  done: Function;
  category: string;
  countdown: number; // In seconds!!!
  countdownStart: number;
  playing: boolean;
  
  private timer: TimerService;
  
  constructor(update: Function, done: Function) {
    this.current = ROUNDTYPE.ROUND_PRE
    this.update = update;
    this.done = done;
    this.countdown = this.countdownStart = 30;
    this.timer = new TimerService();
    this.scores = {};
    this.category = '';
    this.playing = false;
    this.createRound();
  }
  
  // Set-up a round
  private createRound() {
    this.setLetters();
  }
  
  private setLetters():void {
    
    var numLetters: number;
    
    if (this.current === ROUNDTYPE.ROUND_1 || this.current === ROUNDTYPE.FACEOFF_1) {
      numLetters = 3;
    } else if (this.current === ROUNDTYPE.ROUND_2) {
      numLetters = 4;
    } else if (this.current === ROUNDTYPE.ROUND_3 || this.current === ROUNDTYPE.FACEOFF_2) {
      numLetters = 5;
    } else if (this.current === ROUNDTYPE.ROUND_4) {
      numLetters = 6;
    } else if (this.current === ROUNDTYPE.ROUND_5 || this.current === ROUNDTYPE.FACEOFF_3) {
      numLetters = 7;
    } else {
      numLetters = 0;
    }

    if (numLetters) {
      this.letters = LetterService.getLetters(numLetters).getLettersViewModel();
    } else {
      this.letters = null; // A non-playing round
    }
  }
  
  private getCountdownForRound(currentRound: ROUNDTYPE): number {
    // A "playing" round lasts for 60 seconds. All others last 30
    if (currentRound > ROUNDTYPE.ROUND_PRE && currentRound <= ROUNDTYPE.FACEOFF_3) {
      return 60;
    } else {
      return 30;
    }
  }
  
  getRoundViewModel(): IRoundVM {
    return {
      current: this.current,
      scores: this.scores,
      letters: this.letters,
      category: this.category,
      countdown: this.countdown,
      countdownStart: this.countdownStart,
      playing: this.playing
    };
  }
  
  // Start the countdown
  start(startAt?: number): void {
    
    this.countdownStart = this.countdown = startAt || 30;
    
    this.timer.onTimerTick(() => {
      if (this.countdown >= 0) {
        this.countdown--;
      }
      this.update(this.getRoundViewModel());
    });
    
    this.timer.onTimerComplete(() => {
      this.playing = false;
      this.update(this.getRoundViewModel());
      this.done(this);
    });
    
    this.playing = true;
    
    // Start it!
    this.timer.start(this.countdown * 1000);
  }
  
  next(): void {
    if (this.current !== ROUNDTYPE.FACEOFF_WINNER) {
      this.current = this.current + 1;
      this.setLetters();
      this.start(this.getCountdownForRound(this.current));
    } else {
      // todo: end the game somehow
    }
  }
}