import {IRoundVM, IRound, Round, ROUND_STAGE}  from './Round';
import {IPlayer}        from './Player';

export interface IGame {
  roomId: string;
  rounds: IRoundVM[];
  currentRound: IRoundVM;
  players: any[];
  updateCallback: Function;
  addPlayer(player: Object);
  removePlayer(player: Object);
  nextRound(updateCallback: Function);
  getData: Function;
}

export interface IGameData {
  roomId: string;
  rounds: IRoundVM[];
  currentRound: IRoundVM;
  players: any[];
}

export class Game implements IGame {
  
  roomId: string;
  currentRound: IRoundVM;
  rounds: IRoundVM[];
  roundInstance: IRound;
  players: IPlayer[];
  updateCallback: Function;
  
  constructor(roomId: string, updateCallback: Function, players?: IPlayer[]) {
    this.rounds = [];
    this.players = [];
    this.roomId = roomId;
    this.updateCallback = updateCallback;
    this.roundInstance = new Round(ROUND_STAGE.ROUND_5); // todo temp
    this.currentRound =  this.roundInstance.getRoundViewModel();
    this.rounds.push(this.currentRound);
    this.players = players || null;
    
    this.nextRound(); // TODO: temp?
 }
  
  getData(): IGameData {
    var data = {
      roomId: this.roomId,
      rounds: this.rounds,
      currentRound: this.currentRound,
      players: this.players
    };
    return data;
  }
  
  addPlayer(player: IPlayer):void {
    // this.players.push(player);
    this.updateCallback(this.getData());
  }
  
  removePlayer(player: IPlayer):void {
    // this.players.pop();
    this.updateCallback(this.getData());
  }
  
  nextRound():void {
    // TODO: do something to advance the round
    this.roundInstance.startCountdown(this.updateCallback);
    this.updateCallback(this.getData());
  };
}