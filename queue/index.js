"use strict";
var Auth_1 = require('./lib/Auth');
var StartQueue_1 = require('./lib/StartQueue');
var Queue = (function () {
    function Queue(url, token) {
        this.url = url;
        this.token = token;
    }
    Queue.prototype.start = function () {
        console.log('Starting Queue... ');
        Auth_1.Auth.firebase(this.url, this.token).then(function ($firebaseInstance) { return StartQueue_1.StartQueue($firebaseInstance); })
            .catch(function (error) {
            console.error(error);
        });
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=index.js.map