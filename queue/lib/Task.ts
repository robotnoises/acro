// Task.js
// Various Task-related utility methods

import Firebase = require('firebase');
import {QueueConfig}  from './../config/Config';

export enum TASK_TYPE {
  GAMEBOT
}

export interface ITask {
  type: TASK_TYPE;
  data: Object;
  timestamp: string;
}

export class Task implements ITask {
  
  type: TASK_TYPE;
  data: Object;
  timestamp: string;
  
  constructor(taskType: TASK_TYPE, data: Object) {
    this.type = taskType;
    this.data = data;
    this.timestamp = Firebase.ServerValue.TIMESTAMP;
  }
}
