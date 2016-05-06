// Queue.js
// Fetch Tasks from the Queue

import {Triage} from './Triage';

var Queue = require('firebase-queue');

export function StartQueue(firebase: any, queuePath: string) {
  var $ref;
  var queue;
  
  console.log('Starting the Queue');
  
  $ref = firebase.child(queuePath);
  queue = new Queue($ref, Triage.task);
  
  if (queue) {
    console.log(`Queue started, watching for Tasks on ${queuePath}`);  
  }

  // Graceful shutdown
  process.on('SIGINT', function () {
    
    console.log('Starting queue shutdown');
    
    queue.shutdown().then(function () {
      console.log('Finished queue shutdown');
      process.exit(0);
    });
  });
}

