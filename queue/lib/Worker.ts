// Worker.js
// Various Workers to process Tasks

import {ITask} from './Task';

export class Worker {
  
  constructor() {}
  
  static gameWorker(data: ITask):Promise<any> {
    return new Promise(function (resolve, reject) {
      // TODO: DO SOMETHIN'
      console.log('Getting a gameWorker...');
      resolve();
    });
  }
}