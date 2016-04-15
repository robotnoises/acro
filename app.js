"use strict";
var data_1 = require('./data');
var queue_1 = require('./queue');
var server_1 = require('./server');
var api_1 = require('./api');
var Config_1 = require('./queue/config/Config');
var Config_2 = require('./config/Config');
/*
 * Start starting stuff
*/
console.log('Starting the application');
// Start the server
var server = new server_1.Server(Config_2.Config.PORT());
var api = new api_1.Api();
api.start(server.start());
// Sync the database with its Models 
var db = new data_1.Database();
db.sync().then(function () {
    console.log('Database synchronized');
}).catch(function (err) {
    console.error(err);
});
// Start the Queue
var queue = new queue_1.Queue(Config_1.QueueConfig.FB_QUEUEPATH(), Config_1.QueueConfig.FB_TOKEN());
queue.start();
//# sourceMappingURL=App.js.map