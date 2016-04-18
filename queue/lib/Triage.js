// Triage.js
// A Worker factory
"use strict";
var Task_1 = require('./Task');
var Worker_1 = require('./Worker');
var Triage = (function () {
    function Triage() {
    }
    Triage.task = function (data, progress, resolve, reject) {
        function getWorker(taskType) {
            if (taskType === Task_1.TASK_TYPE.GAME) {
                return Worker_1.Worker.gameWorker;
            }
            else {
                console.error();
                throw new Error("Task " + taskType + " does not exist.");
            }
        }
        var fn = getWorker(data.type);
        return fn(data).then(function () {
            resolve();
        }).catch(function (error) {
            console.error(error);
            reject(error);
        });
    };
    return Triage;
}());
exports.Triage = Triage;
//# sourceMappingURL=Triage.js.map