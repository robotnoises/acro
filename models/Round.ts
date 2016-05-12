/**
 * Round.ts
 * 
 * Any classes, enums, or interfaces relating to Rounds of a Game.
 * 
 */

import {LetterService, ILettersVM} from './../services/LetterService';
import {CategoryService} from './../services/CategoryService';
import {TimerService} from './../services/TimerService';

/**
 * ROUND_TYPE
 * 
 * An enum representing each possible Round type.
 * 
 * ROUND_PRE - An idle period before the playing portion of a Game
 * ROUND_# - The first "playing" Round, three letters
 * ROUND_#_VOTE - Voting for round 1
 * ROUND_#_RESULTS - Show how the round was voted, award point
 * ...
 * FACEOFF_# - The first Faceoff Round between the top two players, three letters
 * FACEOFF_#_VOTE - ... voting
 * FACEOFF_#_RESULTS - Show results
 * ...
 * FACEOFF_WINNER - An idle period after the Game has finished. Good job winner!
 * 
 */

export enum ROUND {
  ROUND_PRE,
  ROUND_1,
  ROUND_1_VOTE,
  ROUND_1_RESULTS,
  ROUND_2,
  ROUND_2_VOTE,
  ROUND_2_RESULTS,
  ROUND_3,
  ROUND_3_VOTE,
  ROUND_3_RESULTS,
  ROUND_4,
  ROUND_4_VOTE,
  ROUND_4_RESULTS,
  ROUND_5,
  ROUND_5_VOTE,
  ROUND_5_RESULTS,
  FACEOFF_1, 
  FACEOFF_1_VOTE,
  FACEOFF_1_RESULTS,
  FACEOFF_2, 
  FACEOFF_2_VOTE,
  FACEOFF_2_RESULTS,
  FACEOFF_3,
  FACEOFF_3_VOTE,
  FACEOFF_3_RESULTS,
  FACEOFF_WINNER
}

export enum ROUND_TYPE {
  IDLE,
  PLAYING,
  VOTE,
  RESULTS
}

/**
 * IRound
 * 
 * An interface for Round classes.
 * 
 */

export interface IRound {
  current: ROUND;
  type: ROUND_TYPE;
  playing: boolean;
  letters: ILettersVM;
  category: string;
  categoryBlacklist: number[];
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
 * 
 */

export interface IRoundVM {
  current: ROUND;
  type: ROUND_TYPE;
  playing: boolean;
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
 * @prop {ROUND_TYPE} current - The current Round type
 * @prop {boolean} playing - Are we playing or not?
 * @prop {Object} scores - Each player's score for the Round
 * @prop {ILettersVM} letters - The Letters (if any) for the Round
 * @prop {string} category - A prompt for players to use while playing a Round
 * @prop {number} countdown - Current countdown tick value
 * @prop {number} countdownStart - What number did the Timer start on?
 * 
 */

export class Round implements IRound {
  
  current: ROUND;
  type: ROUND_TYPE;
  playing: boolean;
  letters: ILettersVM;
  category: string;
  categoryBlacklist: number[];
  countdown: number; // In seconds!!!
  countdownStart: number;
  updateCallback: any;
  doneCallback: any;

  private timer: TimerService;
  
  constructor(updateCallback: Function, doneCallback: Function) {
    this.current = ROUND.ROUND_PRE;
    this.type = ROUND_TYPE.IDLE;
    this.updateCallback = updateCallback;
    this.doneCallback = doneCallback;
    this.countdown = this.countdownStart = 30;
    this.timer = new TimerService();
    this.category = null;
    this.categoryBlacklist = [];
    this.letters = null;
    this.playing = false;
  }
  
  // Set-up a round
  private createRound(): void {
    this.setLetters();
    this.setCategory();
  }
  
  // Is this a playing round? This refers to Rounds where a User attempts to 
  // solve a given Acro puzzle.
  private isPlayingRound(): boolean {
    return ( 
      this.current === ROUND.ROUND_1 || 
      this.current === ROUND.ROUND_2 ||
      this.current === ROUND.ROUND_3 || 
      this.current === ROUND.ROUND_4 ||
      this.current === ROUND.ROUND_5 || 
      this.current === ROUND.FACEOFF_1 ||
      this.current === ROUND.FACEOFF_2 || 
      this.current === ROUND.FACEOFF_3
    )
  }
  
  // This is generally an idle period for displaying the results of the last voting Round
  private isResultsRound(): boolean {
    return (
      this.current === ROUND.ROUND_1_RESULTS ||
      this.current === ROUND.ROUND_2_RESULTS ||
      this.current === ROUND.ROUND_3_RESULTS ||
      this.current === ROUND.ROUND_4_RESULTS ||
      this.current === ROUND.ROUND_5_RESULTS ||
      this.current === ROUND.FACEOFF_1_RESULTS ||
      this.current === ROUND.FACEOFF_2_RESULTS ||
      this.current === ROUND.FACEOFF_3_RESULTS
    )
  }
  
  // Get the letters for a Round
  private setLetters(): void {
    
    var numLetters: number;
    
    if (this.current === ROUND.ROUND_1 || this.current === ROUND.FACEOFF_1) {
      numLetters = 3;
    } else if (this.current === ROUND.ROUND_2) {
      numLetters = 4;
    } else if (this.current === ROUND.ROUND_3 || this.current === ROUND.FACEOFF_2) {
      numLetters = 5;
    } else if (this.current === ROUND.ROUND_4) {
      numLetters = 6;
    } else if (this.current === ROUND.ROUND_5 || this.current === ROUND.FACEOFF_3) {
      numLetters = 7;
    } else {
      numLetters = 0;
    }

    if (numLetters) {
      this.letters = LetterService.getLetters(numLetters).getLettersViewModel();
    } else {
      this.letters = null; // A non-playing round
    }
    
    this.updateCallback(this.getRoundViewModel());
  }
  
  private setCategory(): void {
    if (this.isPlayingRound()) {
      var c = CategoryService.choose(this.categoryBlacklist);
      this.category = c.category;
      this.categoryBlacklist.push(c.key);
    } else {
      this.category = null;
    }
  }
  
  // 60 seconds for playing Rounds, 10 seconds for Results, otherwise it's 30.
  private getCountdownForRound(): number {
    // A "playing" round lasts for 60 seconds. All others last 30.
    if (this.isPlayingRound()) {
      return 60;
    } else if (this.isResultsRound()) {
      return 10;
    } else {
      // Idle periods and voting Rounds
      return 30;
    }
  }
  
  // Get a ViewModel object representing the current state of the Round
  getRoundViewModel(): IRoundVM {
    return {
      current: this.current,
      type: this.type,
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
    if (this.current !== ROUND.FACEOFF_WINNER) {
      console.log('Advancing to next Round');
      this.current = this.current + 1;
      this.type = (this.type === ROUND_TYPE.RESULTS) ? ROUND_TYPE.PLAYING : (this.type + 1);
      this.createRound();
      this.start(this.getCountdownForRound());
    } else {
      this.type = ROUND_TYPE.IDLE;
      console.log('Game over, man');
    }
  }
}