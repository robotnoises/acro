import {Auth}   from './lib/Auth';
import {StartQueue} from './lib/StartQueue';

export class Queue {
  
  private url: string;
  private token: string;
  
  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }
  
  start() {
    console.log('Starting Queue... ');
    Auth.firebase(this.url, this.token).then(($firebaseInstance: any) => StartQueue($firebaseInstance))
    .catch((error: any) => {
      console.error(error);
    });
  }
}
