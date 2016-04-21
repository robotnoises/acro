import {IGame, IGameData, Game} from './../../models/Game';
import {IFirebaseService, FirebaseService} from './../services/FirebaseService';
import {IWorker} from './IWorker';
import {IRoundVM} from './../../models/Round';

export class GameWorker implements IWorker {
  
  game: IGame;
  gameData: IGameData;
  firebase: IFirebaseService;
  
  constructor(data: any) {
    this.firebase = new FirebaseService();
    this.game = new Game(data.roomId, (round: IRoundVM) => {
      console.log('updating...');
      this.firebase.update(`/games/${data.roomId}/currentRound`, round);
    });
    this.gameData = this.game.getData();
  }
  
  go(): Promise<any> {
    // start the game!
    return new Promise((resolve, reject) => {
      // Todo: hmmmm
      this.firebase.createAt(`/games/${this.gameData.roomId}`, this.gameData);
      setTimeout(function () {
        resolve();  
      }, 10000);
    });
  }
}