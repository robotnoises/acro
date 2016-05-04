/**
 * Round.ts
 * 
 * Any classes, enums, or interfaces relating to the Round of a Game.
 */

import {LetterService, ILettersVM}  from './../services/LetterService';
import {TimerService}               from './../services/TimerService';

/**
 * ROUND_TYPE
 * 
 * An enum representing each possible Round.
 * 
 * ROUND_PRE - An idle period before the playing portion of a Game
 * ROUND_1 - The first "playing" Round, three letters
 * ROUND_2 - The second "playing" Round, four letters
 * ROUND_3 - ... five letters
 * ROUND_4 - ... six letters
 * ROUND_5 - ... seven letters
 * FACEOFF_1 - The first Faceoff Round between the top two players, three letters
 * FACEOFF_2 - The second..., five letters
 * FACEOFF_3 - The last..., seven letters
 * FACEOFF_WINNER - An idle period after the Game has finished. Good job winner!
 */

export enum ROUND_TYPE {
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

/**
 * ROUND_STATUS
 * 
 * An enum representing a portion of the Round.
 * 
 * IDLE - Nothing is happening
 * PLAYING - Players are currently entering their answers
 * VOTING - Players are voting for their favorite answer
 * RESULTS - Tally-up the votes, display the results
 */

export enum ROUND_STATUS {
  IDLE,
  PLAYING,
  VOTING,
  RESULTS
}

/**
 * IRound
 * 
 * An interface for Round classes.
 */

export interface IRound {
  current: ROUND_TYPE;
  status: ROUND_STATUS;
  playing: boolean;
  scores: Object; // todo
  letters: ILettersVM;
  category: string;
  countdown: number;
  countdownStart: number;
  start(startAt?: number);
  getRoundViewModel();
  updateCallback();
  doneCallback();
  next();
}

/**
 * IRoundVM
 * 
 * An interfact for Round ViewModels. Any data meant to be persisted in
 * Firebase should be included here. No Functions.
 */

export interface IRoundVM {
  current: ROUND_TYPE;
  status: ROUND_STATUS;
  playing: boolean;
  scores: Object; // todo
  letters: ILettersVM;
  category: string;
  countdown: number;
  countdownStart: number;
}

/**
 * Round
 * 
 * A class that tracks Round data. A Round object encapulates data for all rounds.
 *
 * Constructor:
 * 
 * @param {Function} updateCallback - handler function to update Firebase when the data changes
 * @param {Function} doneCallback - handler function to signal the Round is done
 * 
 * Properties:
 * 
 * @prop {ROUND_TYPE} current - The current Round
 * @prop {ROUND_STATUS} status - What's happening in the current Round
 * @prop {boolean} playing - Are we playing or not?
 * @prop {Object} scores - Each player's score for the Round
 * @prop {ILettersVM} letters - The Letters (if any) for the Round
 * @prop {string} category - A prompt for players to use while playing a Round
 * @prop {number} countdown - Current countdown tick value
 * @prop {number} countdownStart - What number did the Timer start on?
 */

export class Round implements IRound {
  
  current: ROUND_TYPE;
  status: ROUND_STATUS;
  playing: boolean;
  scores: Object; // todo IScore?
  letters: ILettersVM;
  category: string;
  countdown: number; // In seconds!!!
  countdownStart: number;
  updateCallback: any;
  doneCallback: any;

  private timer: TimerService;
  
  constructor(updateCallback: Function, doneCallback: Function) {
    this.current = ROUND_TYPE.ROUND_PRE
    this.updateCallback = updateCallback;
    this.doneCallback = doneCallback;
    this.countdown = this.countdownStart = 30;
    this.timer = new TimerService();
    this.status = ROUND_STATUS.IDLE;
    this.scores = {};
    this.category = '';
    this.playing = false;
    this.createRound();
  }
  
  // Set-up a round
  private createRound(): void {
    this.status = ROUND_STATUS.PLAYING;
    this.setLetters();
  }
  
  // Get the letters for a Round
  private setLetters(): void {
    
    var numLetters: number;
    
    if (this.current === ROUND_TYPE.ROUND_1 || this.current === ROUND_TYPE.FACEOFF_1) {
      numLetters = 3;
    } else if (this.current === ROUND_TYPE.ROUND_2) {
      numLetters = 4;
    } else if (this.current === ROUND_TYPE.ROUND_3 || this.current === ROUND_TYPE.FACEOFF_2) {
      numLetters = 5;
    } else if (this.current === ROUND_TYPE.ROUND_4) {
      numLetters = 6;
    } else if (this.current === ROUND_TYPE.ROUND_5 || this.current === ROUND_TYPE.FACEOFF_3) {
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
  
  // 60 seconds for playing Rounds, otherwise it's 30
  private getCountdownForRound(currentRound: ROUND_TYPE): number {
    // A "playing" round lasts for 60 seconds. All others last 30
    if (currentRound > ROUND_TYPE.ROUND_PRE && currentRound <= ROUND_TYPE.FACEOFF_3) {
      return 60;
    } else {
      return 30;
    }
  }
  
  // Get a ViewModel object representing the current state of the Round
  getRoundViewModel(): IRoundVM {
    return {
      current: this.current,
      status: this.status,
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
    
    // Wait a few seconds before starting the Timer
    let WAIT = 3000;
    
    this.countdownStart = this.countdown = startAt || 30;
    this.updateCallback(this.getRoundViewModel());
    
    this.timer.onTimerTick(() => {
      if (this.countdown >= 0) {
        this.countdown--;
      }
      this.updateCallback(this.getRoundViewModel());
    });
    
    this.timer.onTimerComplete(() => {
      this.playing = false;
      this.updateCallback(this.getRoundViewModel());
      this.doneCallback(this);
    });
    
    // Start it!
    var timeout = setTimeout(() => {
      this.playing = true;
      this.timer.start(this.countdown * 1000);
      clearTimeout(timeout);
      }, WAIT);
  }
  
  // Advance to the next Round
  next(): void {
    if (this.current !== ROUND_TYPE.FACEOFF_WINNER) {
      this.current = this.current + 1;
      this.createRound();
      this.start(this.getCountdownForRound(this.current));
    } else {
      // todo: end the game somehow
      console.log('Game over, man');
    }
  }
}