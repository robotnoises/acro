// Queue.js
// Fetch Tasks from the Queue

import {QueueConfig}  from './../config/Config';
import {Triage}       from './Triage';
var Queue =           require('firebase-queue');

export function StartQueue(firebase: any) {

  var $ref = firebase.child(QueueConfig.FB_QUEUEPATH());
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

