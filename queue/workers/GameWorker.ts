/**
 * GameWorker.ts
 * 
 * Anything related to the GameWorker class.
 * 
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
 * 
 */

export class GameWorker implements IWorker {
  
  firebase: IFirebaseService;
  
  private game: IGame;
  private updateUri: string;
  
  constructor(data: any) {
    
    // The Firebase Instance
    this.firebase = new FirebaseService();

    // The Game Object
    this.game = new Game(data.roomId, (round: IRound) => {
      if (this.updateUri) {
        this.firebase.update(this.updateUri, round);  
      }
    }, (round: IRound) => {
      round.next();
    });
  }
  
  // Let's go!!!!
  go(): Promise<any> {
    // Start the Game
    this.game.start();
    // Create in Firebase
    return new Promise((resolve) => {
      var gameData = this.game.getData();
      this.firebase.createAt(`/games/${gameData.roomId}`, gameData)
        .then((value: any) => {
          this.updateUri = `/games/${gameData.roomId}/round`;
          resolve();
        });
    });
  }
}