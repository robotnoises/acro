// Queue.js
// Fetch Tasks from the Queue

import {Triage} from './Triage';

var Queue = require('firebase-queue');

export function StartQueue(firebase: any, queuePath: string) {

  var $ref = firebase.child(queuePath);
  var queue = new Queue($ref, Triage.task);

  // Graceful shutdown
  process.on('SIGINT', function () {
    
    console.log('Starting queue shutdown');
    
    queue.shutdown().then(function () {
      console.log('Finished queue shutdown');
      process.exit(0);
    });
  });
}

