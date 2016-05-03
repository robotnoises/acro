import {
  IRoundVM, 
  IRound, 
  Round, 
  ROUNDTYPE
}                 from './Round';
import {IPlayer}  from './Player';

export interface IGame {
  roomId: string;
  rounds: IRound[];
  round: IRound;
  players: any[];
  updateCallback: Function;
  nextRoundCallback: Function;
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
  round: IRound;
  rounds: IRound[];
  roundInstance: IRound;
  players: IPlayer[];
  updateCallback: Function;
  nextRoundCallback: Function;
  
  constructor(roomId: string, updateCallback: Function, nextRoundCallback: Function, players?: IPlayer[]) {
    this.rounds = [];
    this.players = [];
    this.roomId = roomId;
    this.updateCallback = updateCallback;
    this.nextRoundCallback = nextRoundCallback;
    this.roundInstance = new Round(this.updateCallback, this.nextRoundCallback);
    this.round =  this.roundInstance.getRoundViewModel();
    this.rounds.push(this.round);
    this.players = players || null;
  }
  
  start(): void {
    this.roundInstance.start(30);
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