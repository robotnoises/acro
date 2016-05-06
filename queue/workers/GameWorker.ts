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
 * A Worker responsible for a creating a Game instance and handling its callbacks
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

    /**
     * The Game object, which takes two callbacks:
     * 
     * 1.) The updateCallback => when the data changes, persist that back to Firebase
     * 2.) The nextRoundCallback => The Timer as finished, so advance to the next Round 
     *  
     * */ 
    
    this.game = new Game(data.roomId, 
      (round: IRound) => this.updateFirebase(round), 
      (round: IRound) => this.advanceRound(round));
  }
  
  // Acts as a callback from the Game object, which is responsible for updating Firebase 
  // when data changes.
  private updateFirebase(round: IRound): void {
    if (this.updateUri) {
      this.firebase.update(this.updateUri, round);  
    }
  }
  
  // Acts as a callback from the Game object to advance to the next Round.
  private advanceRound(round: IRound) {
    round.next();
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