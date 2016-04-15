import {Database}     from './data';
import {Queue}        from './queue';
import {Server}       from './server';
import {Api}          from './api';
import {QueueConfig}  from './queue/config/Config';
import {Config}       from './config/Config';

/*
 * Start starting stuff
*/

console.log('Starting the application');

// Start the server
var server = new Server(Config.PORT());
var api = new Api();

api.start(server.start());

// Sync the database with its Models 

var db = new Database();

db.sync().then(function () {
  console.log('Database synchronized');
}).catch(function (err) {
  console.error(err);
});

// Start the Queue

var queue = new Queue(QueueConfig.FB_QUEUEPATH(), QueueConfig.FB_TOKEN());
queue.start();