// Queue.js
// Fetch Tasks from the Queue
"use strict";
var FirebaseQueue = require('firebase-queue');
var Config_1 = require('./../config/Config');
var Triage_1 = require('./Triage');
var FQueue = (function () {
    function FQueue(firebaseInstance) {
        this.firebase = firebaseInstance;
    }
    FQueue.prototype.start = function () {
        var $ref = this.firebase.child(Config_1.QueueConfig.FB_QUEUEPATH());
        var queue = new FirebaseQueue($ref, Triage_1.Triage.task);
        // Graceful shutdown
        process.on('SIGINT', function () {
            console.log('Starting queue shutdown');
            queue.shutdown().then(function () {
                console.log('Finished queue shutdown');
                process.exit(0);
            });
        });
    };
    return FQueue;
}());
exports.FQueue = FQueue;
//# sourceMappingURL=Queue.js.map