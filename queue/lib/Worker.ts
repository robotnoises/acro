// Worker.js
// Various Workers to process Tasks

import {ITask} from './Task';
import {GameWorker} from './../workers/GameWorker';
import {TimerService} from './../../services/TimerService';

export class Worker {
  
  constructor() {}
  
  static gameWorker(task: ITask):Promise<any> {
    return new GameWorker(task.data).go();
  }
}