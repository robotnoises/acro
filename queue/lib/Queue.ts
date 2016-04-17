// Queue.js
// Fetch Tasks from the Queue

var FirebaseQueue = require('firebase-queue');
import {QueueConfig}  from './../config/Config';
import {Triage}       from './Triage';

export class FQueue {
  
  private firebase: any;
  
  constructor(firebaseInstance: any) {
    this.firebase = firebaseInstance;
  }
  
  start() {
    
    var $ref = this.firebase.child(QueueConfig.FB_QUEUEPATH());
    var queue = new FirebaseQueue($ref, Triage.task);
    
    // Graceful shutdown
    process.on('SIGINT', function() {
      console.log('Starting queue shutdown');
      queue.shutdown().then(function() {
        console.log('Finished queue shutdown');
        process.exit(0);
      });
    });
  }
}
