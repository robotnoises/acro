// Worker.js
// Various Workers to process Tasks
"use strict";
var Worker = (function () {
    function Worker() {
    }
    Worker.gameWorker = function (data) {
        return new Promise(function (resolve, reject) {
            // TODO: DO SOMETHIN'
            console.log('Getting a gameWorker...');
            resolve();
        });
    };
    return Worker;
}());
exports.Worker = Worker;
//# sourceMappingURL=Worker.js.map