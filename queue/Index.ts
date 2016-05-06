import {Auth}   from './lib/Auth';
import {StartQueue} from './lib/StartQueue';

export class Queue {
  
  private url: string;
  private queuePath: string;
  private token: string;
  
  constructor(url: string, queuePath: string, token: string) {
    this.url = url;
    this.queuePath = queuePath;
    this.token = token;
  }
  
  start() {
    console.log('Starting Queue... ');
    Auth.firebase(this.url, this.token).then(($firebaseInstance: any) => StartQueue($firebaseInstance, this.queuePath))
    .catch((error: any) => {
      console.error(error);
    });
  }
}
