import {Server}       from './server';
import {Queue}        from './queue';

import {QueueConfig}  from './queue/config/Config';
import {Config}       from './config/Config';

/*
 * Start starting stuff
*/

console.log('Starting the application');

// Start the server
var server = new Server(Config.PORT());

// Start the Queue

var queue = new Queue(QueueConfig.FB_URL(), QueueConfig.FB_TOKEN());
queue.start();