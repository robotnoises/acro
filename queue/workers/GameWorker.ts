/**
 * GameWorker.ts
 * 
 * Anything related to the GameWorker class.
 */

import {IGame, IGameVM, Game} from './../../models/Game';
import {IFirebaseService, FirebaseService} from './../services/FirebaseService';
import {IWorker} from './IWorker';
import {IRound} from './../../models/Round';

/**
 * GameWorker
 * 
 * A Worker responsible for a Game instance's timing and updates.
 * 
 * Constructor:
 * 
 * @param {any} data - Task related to the construction of a GameWorker
 * 
 * Methods:
 * 
 * @method go(): void - Start the Game
 */

export class GameWorker implements IWorker {
  
  firebase: IFirebaseService;
  
  private game: IGame;
  
  constructor(data: any) {
    
    // The Firebase Instance
    this.firebase = new FirebaseService();
    
    // The Game Object
    this.game = new Game(data.roomId, (round: IRound) => {
      this.firebase.update(`/games/${data.roomId}/round`, round);
    }, (round: IRound) => {
      round.next();
    });
  }
  
  // Let's go!!!!
  go(): Promise<any> {
    this.game.start();
    var gameData = this.game.getData();
    return this.firebase.createAt(`/games/${gameData.roomId}`, gameData);
  }
}