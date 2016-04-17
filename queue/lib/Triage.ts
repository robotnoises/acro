// Triage.js
// A Worker factory

import {Task, ITask, TASK_TYPE} from './Task';
import {Worker} from './Worker';

export class Triage {
  
  constructor() {}
  
  private static getWorker(taskType: TASK_TYPE) {
    if (taskType === TASK_TYPE.GAMEBOT) {
      return Worker.gameBot;
    } else {
      console.error();
      throw new Error(`Task ${taskType} does not exist.`)
    }
  }
  
  static task(data: ITask, progress: any, resolve: Function, reject: Function) {
    
    var fn = this.getWorker(data.type);
  
    fn(data).then(() => resolve).catch((error) => {
      console.error(error);
      reject(error);  
    });
  }
}
