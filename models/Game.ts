import {
  IRoundVM, 
  IRound, 
  Round, 
  ROUNDTYPE
}                 from './Round';
import {IPlayer}  from './Player';

export interface IGame {
  roomId: string;
  rounds: IRoundVM[];
  round: IRoundVM;
  players: any[];
  updateCallback: Function;
  addPlayer(player: Object);
  removePlayer(player: Object);
  getData: Function;
  start: Function;
}

export interface IGameData {
  roomId: string;
  rounds: IRoundVM[];
  round: IRoundVM;
  players: any[];
}

export class Game implements IGame {
  
  roomId: string;
  round: IRoundVM;
  rounds: IRoundVM[];
  roundInstance: IRound;
  players: IPlayer[];
  updateCallback: Function;
  
  constructor(roomId: string, updateCallback: Function, players?: IPlayer[]) {
    this.rounds = [];
    this.players = [];
    this.roomId = roomId;
    this.updateCallback = updateCallback;
    this.roundInstance = new Round(ROUNDTYPE.ROUND_PRE);
    this.round =  this.roundInstance.getRoundViewModel();
    this.rounds.push(this.round);
    this.players = players || null;
  }
  
  start(): void {
    this.roundInstance.startCountdown(this.updateCallback, 30);
  }
  
  getData(): IGameData {
    var data = {
      roomId: this.roomId,
      rounds: this.rounds,
      round: this.round,
      players: this.players
    };
    return data;
  }
  
  addPlayer(player: IPlayer): void {
    // this.players.push(player);
    this.updateCallback(this.getData());
  }
  
  removePlayer(player: IPlayer): void {
    // this.players.pop();
    this.updateCallback(this.getData());
  }
}