// Triage.js
// A Worker factory

import {Task, ITask, TASK_TYPE} from './Task';
import {Worker} from './Worker';

export class Triage {
  
  constructor() { }

  static task(task: ITask, progress: any, resolveTask: Function, rejectTask: Function) {
    console.log(`Task recieved (${task.type})`);   
    
    function getWorker(taskType: TASK_TYPE) {
      if (taskType === TASK_TYPE.GAME) {
        console.log('Creating a Worker: Game');
        return Worker.gameWorker;
      } else {
        throw new Error(`Task ${taskType} does not exist.`)
      }
    }
    
    var fn = getWorker(task.type);
    
    return fn(task)
      .then(() => {
        resolveTask();
      })
      .catch((error) => { 
        rejectTask(error);
      })
  }
}
