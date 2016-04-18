/*
 * FirebaseService.ts
 * A Wrapper for the Firebase API
 * 
 * */
 
import Firebase = require('firebase');
import {QueueConfig} from './../config/Config'

export interface IFirebaseService {
  create(path: string, data: Object): Promise<Object>;
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
    return new Promise(function (resolve, reject) {
      $ref.once('child_added', ($snap) => {
        resolve($snap.val());
      }, reject);
    });
  }
  
  create(path: string, data: Object): Promise<Object> {
    return this.waitForResponse(this.firebase.child(path).push(data));
  }
  
  read(path: string):Promise<Object> {
    return this.waitForResponse(this.firebase.child(path));
  }
  
  update(path: string, data: Object): Promise<Object> {
    return this.waitForResponse(this.firebase.child(path).update(data));
  }
  
  delete(path: string, data: Object): void {
    // return this.waitForResponse(this.firebase.child(path).remove());
    this.firebase.child(path).remove();
  }
}