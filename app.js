// var db =      require('./data/database');
// var server =  require('./server/server');
// var api =     require('./api/api');
"use strict";
var Config_1 = require('./queue/config/Config');
;
var queue_1 = require('./queue');
// Alias the Queue Config
var queueConfig = Config_1.Config;
var q = new queue_1.Queue(queueConfig.FB_QUEUEPATH(), queueConfig.FB_TOKEN());
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
//# sourceMappingURL=App.js.map