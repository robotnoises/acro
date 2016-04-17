"use strict";
var Auth_1 = require('./lib/Auth');
var Queue_1 = require('./lib/Queue');
var Queue = (function () {
    function Queue(url, token) {
        this.url = url;
        this.token = token;
    }
    Queue.prototype.start = function () {
        console.log('Starting Queue... ');
        Auth_1.Auth.firebase(this.url, this.token).then(function ($firebaseInstance) {
            var queue = new Queue_1.FQueue($firebaseInstance);
            queue.start();
        }).catch(function (error) {
            console.error(error);
        });
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=index.js.map