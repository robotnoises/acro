import {IGame, IGameData, Game} from './../../models/Game';
import {IFirebaseService, FirebaseService} from './../services/FirebaseService';
import {IWorker} from './IWorker';

export class GameWorker implements IWorker {
  
  game: IGameData;
  firebase: IFirebaseService;
  
  constructor(data: any) {
    this.firebase = new FirebaseService();
    var newGame = new Game(data.roomId, this.firebase.update);
    this.game = newGame.getData();
  }
  
  // private gameHandler(gameData: Object) {
  //   // start a timer, when timer finishes, do something/update
  //   console.log('Game data!!!!', gameData);
  // }
  
  go(): Promise<any> {
    // start the game!
    return new Promise((resolve, reject) => {
      // Todo: hmmmm
      this.firebase.createAt(`/games/${this.game.roomId}`, this.game);
      resolve();
    });
  }
}