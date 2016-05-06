/**
 * App.ts
 * 
 * Let's start-up some junk.
 * 
 */

import {Server} from './server';
import {Queue} from './queue';
import {Config} from './config';

// Start the server
var server = new Server(Config.PORT());
server.start();

// Start the Queue
var queue = new Queue(Config.FB_URL(), Config.FB_QUEUEPATH(), Config.FB_TOKEN());
queue.start();