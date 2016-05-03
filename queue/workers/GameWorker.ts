import {IGame, IGameData, Game} from './../../models/Game';
import {IFirebaseService, FirebaseService} from './../services/FirebaseService';
import {IWorker} from './IWorker';
import {IRound} from './../../models/Round';

export class GameWorker implements IWorker {
  
  game: IGame;
  gameData: IGameData;
  firebase: IFirebaseService;
  
  constructor(data: any) {
    // The Firebase Instance
    this.firebase = new FirebaseService();
    
    // The Game Object
    this.game = new Game(data.roomId, (round: IRound) => {
      this.firebase.update(`/games/${data.roomId}/round`, round);
    }, (round: IRound) => {
      round.next();
    });
    
    // ViewModel of the Game
    this.gameData = this.game.getData();
  }
  
  go(): Promise<any> {
    // Let's go!!!!
    this.game.start();
    return this.firebase.createAt(`/games/${this.gameData.roomId}`, this.gameData);
  }
}