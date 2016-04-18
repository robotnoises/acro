import {IFirebaseService} from './../services/FirebaseService';

export interface IWorker {
  firebase: IFirebaseService;
  go(): void;
}