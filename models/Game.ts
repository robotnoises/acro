import {IRound, Round, ROUND_STAGE}  from './Round';
import {IPlayer}        from './Player';


export interface IGame {
  roomId: string;
  rounds: IRound[];
  currentRound: IRound;
  players: any[];
  updateCallback: Function;
  addPlayer(player: Object);
  removePlayer(player: Object);
  nextRound(updateCallback: Function);
}

export interface IGameData {
  roomId: string;
  rounds: IRound[];
  currentRound: IRound;
  players: any[];
}

export class Game implements IGame {
  
  roomId: string;
  currentRound: IRound;
  rounds: IRound[];
  players: IPlayer[];
  updateCallback: Function;
  
  constructor(roomId: string, updateCallback: Function, players?: IPlayer[]) {
    this.rounds = [];
    this.players = [];
    this.roomId = roomId;
    this.updateCallback = updateCallback;
    this.currentRound = new Round(ROUND_STAGE.ROUND_5); // TODO: Temp
    this.rounds.push(this.currentRound);
    this.players = players || null;
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
    // do something to advance the round
    this.updateCallback(this.getData());
  };
}