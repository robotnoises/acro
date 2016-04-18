// Triage.js
// A Worker factory
"use strict";
var Task_1 = require('./Task');
var Worker_1 = require('./Worker');
var Triage = (function () {
    function Triage() {
    }
    Triage.task = function (task, progress, resolveTask, rejectTask) {
        function getWorker(taskType) {
            if (taskType === Task_1.TASK_TYPE.GAME) {
                return Worker_1.Worker.gameWorker;
            }
            else {
                throw new Error("Task " + taskType + " does not exist.");
            }
        }
        var fn = getWorker(task.type);
        fn(task)
            .then(function () {
            resolveTask();
        })
            .catch(function (error) {
            rejectTask(error);
        });
    };
    return Triage;
}());
exports.Triage = Triage;
//# sourceMappingURL=Triage.js.map