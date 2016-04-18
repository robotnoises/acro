// Triage.js
// A Worker factory

import {Task, ITask, TASK_TYPE} from './Task';
import {Worker} from './Worker';

export class Triage {
  
  constructor() {}

  static task(data: ITask, progress: any, resolve: Function, reject: Function) {

    function getWorker(taskType: TASK_TYPE) {
      if (taskType === TASK_TYPE.GAME) {
        return Worker.gameWorker;
      } else {
        console.error();
        throw new Error(`Task ${taskType} does not exist.`)
      }
    }
    
    var fn = getWorker(data.type);
  
    return fn(data).then(() => {
      resolve();
    }).catch((error) => {
      console.error(error);
      reject(error);  
    });
  }
}
