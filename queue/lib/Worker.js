// Worker.js
// Various Workers to process Tasks
"use strict";
var GameWorker_1 = require('./../workers/GameWorker');
var Worker = (function () {
    function Worker() {
    }
    Worker.gameWorker = function (task) {
        return new GameWorker_1.GameWorker(task.data).go();
    };
    return Worker;
}());
exports.Worker = Worker;
//# sourceMappingURL=Worker.js.map