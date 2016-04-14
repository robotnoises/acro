// var Config      = require('./config/Config');
// var Auth        = require('./lib/Auth');
// var Monitor     = require('./lib/Monitor');
// var Dispatcher  = require('./lib/Dispatcher');
// var Queue       = require('./lib/Queue');
"use strict";
// import {Auth, Dispatcher, Monitor, Queue} from './lib/Libs';
// function _start() {
//   Auth(Config.FB_URL, Config.FB_TOKEN).then(function ($firebaseInstance) {
//     Dispatcher.start($firebaseInstance, Monitor.paths);
//     Queue.start($firebaseInstance);
//   }).fail(function (error) {
//     console.error(error);
//   });
// }
var Queue = (function () {
    function Queue(url, token) {
        this.url = url;
        this.token = token;
    }
    Queue.prototype.start = function () {
        console.log('hey, it started!');
        console.log('URL: ', this.url);
        console.log('Token: ', this.token);
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=index.js.map