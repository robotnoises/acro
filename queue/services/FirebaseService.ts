/*
 * FirebaseService.ts
 * A Wrapper for the Firebase API
 * 
 * */
 
import Firebase = require('firebase');
import {QueueConfig} from './../config/Config'

export interface IFirebaseService {
  create(path: string, data: Object): Promise<Object>;
  createAt(path: string, data: Object): Promise<Object>;
  read(path: string): Promise<Object>;
  update(path: string, data: Object): Promise<Object>;
  delete(path: string, data: Object): void;
}

export class FirebaseService implements IFirebaseService {
  
  private firebase: any;
  
  constructor() {
    if (!this.firebase) {
      this.firebase = new Firebase(QueueConfig.FB_URL());
    }  
  }
  
  private waitForResponse($ref: any): Promise<Object> {
    return new Promise((resolve, reject) => {
      $ref.once('child_added', ($snap) => {
        resolve($snap.val());
      }, reject);
    });
  }
  
  create(path: string, data: Object): Promise<Object> {
    var $ref = this.firebase.child(path);
    $ref.push(data);
    return this.waitForResponse($ref);
  }
  
  createAt(path: string, data: Object): Promise<Object> {
    var $ref = this.firebase.child(path);
    $ref.set(data);
    return this.waitForResponse($ref);
  }
  
  read(path: string):Promise<Object> {
    return this.waitForResponse(this.firebase.child(path));
  }
  
  update(path: string, data: Object): Promise<Object> {
    var $ref = this.firebase.child(path);
    $ref.update(data);
    return this.waitForResponse($ref);
  }
  
  delete(path: string, data: Object): void {
    this.firebase.child(path).remove();
  }
}