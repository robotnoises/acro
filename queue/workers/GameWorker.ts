import {IGame, Game} from './../../models/Game';
import {IFirebaseService, FirebaseService} from './../services/FirebaseService';
import {IWorker} from './IWorker';

export class GameWorker implements IWorker {
  
  game: IGame;
  firebase: IFirebaseService;
  
  constructor(roomId: string) {
    this.firebase = new FirebaseService();
    this.game = new Game(roomId, this.firebase.update);
  }
  
  private gameHandler(gameData: Object) {
    console.log('Game data!!!!', gameData);
  }
  
  go(): void {
    // start the game!
    this.firebase.create(`/games/${this.game.roomId}`, this.game)
      .then((gameData) => this.gameHandler)
      .catch((error) => {
        console.error(error);
      });
  }
}