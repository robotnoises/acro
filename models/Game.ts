/**
 * Game.ts
 * 
 * Any classes, enums, or interfaces related to a Game.
 * 
 */

import {IRoundVM, IRound, Round, ROUND_TYPE} from './Round';

/**
 * GAME_STATUS
 * 
 * An enum representing the Game's status. It should be used as a flag for 
 * whether or not a Game is:
 * 
 * 1. INACTIVE, meaning there aren't enough people engaged to start a Game
 * 2. READY, meaning the Game is Inactive, but ready to start
 * 3. ACTIVE, meaning there is a Game in progress
 * 
 */

export enum GAME_STATUS {
  INACTIVE, // Not enough engaged players to start a game
  READY,    // Waiting to start a game
  ACTIVE    // Actively playing a game
}

/**
 * IGame
 * 
 * Interface for Game objects
 * 
 */

export interface IGame {
  roomId: string;
  status: GAME_STATUS;
  roundTracker: IRound;
  updateCallback();
  nextRoundCallback();
  start();
  getData();
}

/**
 * IGameVM
 * 
 * Interface for Game ViewModel objects. This is reserved for
 * data that will be persisted in Firebase. No Functions.
 * 
 */

export interface IGameVM {
  roomId: string;
  status: GAME_STATUS;
  round: IRoundVM;
}

/**
 * Game
 * 
 * A Game tracking object. Responsible for tracking all game-related data
 * including its associated Room, its status (GAME_STATUS), its round information,
 * the players involved in the Game.
 * 
 * Constructor:
 * 
 * @param {string} roomId - The id of the Room the Game is associated with
 * @param {Function} updateCallback - A callback function to handle updating Firebase when data changes
 * @param {Function} nextRoundCallback - A callback function to handle advancing to the next Round
 * 
 * Properties:
 * 
 * @prop {string} roomId - The id of the Room the Game is associated with
 * @prop {GAME_STATUS} status - The Game's status
 * @prop {IRound} roundTracker - Tracks the state of the Game's Rounds
 * 
 * Methods:
 * 
 * @method start(): void - Start the Game
 * @method getData(): IGameVM - Get a snapshot of the Game's data
 * 
 */

export class Game implements IGame {
  
  roomId: string;
  status: GAME_STATUS;
  roundTracker: IRound;
  updateCallback: any;
  nextRoundCallback: any;
  
  constructor(roomId: string, updateCallback: Function, nextRoundCallback: Function) {
    this.roomId = roomId;
    this.status = GAME_STATUS.INACTIVE;
    this.updateCallback = updateCallback;
    this.nextRoundCallback = nextRoundCallback;
    this.roundTracker = new Round(this.updateCallback, this.nextRoundCallback);
  }
  
  // Start the Game!
  start(): void {
    this.roundTracker.start(30);
  }
  
  // Get the ViewModel version of the Game in its current state
  getData(): IGameVM {
    return {
      roomId: this.roomId,
      status: this.status,
      round: this.roundTracker.getRoundViewModel()
    };
  }
}