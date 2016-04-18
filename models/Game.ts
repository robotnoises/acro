import {IRound} from './Round';

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

export class Game implements IGame {
  
  roomId: string;
  rounds: IRound[];
  currentRound: IRound;
  players: any[];
  updateCallback: Function;
  
  constructor(roomId: string, updateCallback: Function) {
    this.roomId = roomId;
    this.updateCallback = updateCallback;
  }
  
  private getData(): Object {
    return {
      rounds: this.rounds,
      currentRound: this.currentRound,
      players: this.players
    };
  }
  
  addPlayer(player: Object):void {
    this.players.push(player);
    this.updateCallback(this.getData());
  }
  
  removePlayer(player: Object):void {
    this.players.pop();
    this.updateCallback(this.getData());
  }
  
  nextRound():void {
    // do something to advance the round
    this.updateCallback(this.getData());
  };
}