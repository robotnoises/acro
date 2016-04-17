import {Auth}   from './lib/Auth';
import {FQueue} from './lib/Queue';

export class Queue {
  
  private url: string;
  private token: string;
  
  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }
  
  start() {
    console.log('Starting Queue... ');
    Auth.firebase(this.url, this.token).then(($firebaseInstance: any) => {
      var queue = new FQueue($firebaseInstance);
      queue.start();
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
