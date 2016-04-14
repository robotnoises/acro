// var db =      require('./data/database');
// var server =  require('./server/server');
// var api =     require('./api/api');

import {Config} from './queue/config/Config';;
import {Queue} from './queue';

// Alias the Queue Config
var queueConfig = Config;

var q = new Queue(queueConfig.FB_QUEUEPATH(), queueConfig.FB_TOKEN());
q.start();

/*
 * Start starting stuff
*/

// console.log('Starting the application');

// Start the server
// api.start(server.start());

// Sync the database with its Models 
// db.sync().then(function() {
//   console.log('Database synchronized');
// }).catch(function (err) {
//   console.error(err);
// });

// Start the Queue (TODO)