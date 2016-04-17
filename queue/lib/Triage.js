// Triage.js
// A Worker factory
"use strict";
var Task_1 = require('./Task');
var Worker_1 = require('./Worker');
var Triage = (function () {
    function Triage() {
    }
    Triage.getWorker = function (taskType) {
        if (taskType === Task_1.TASK_TYPE.GAMEBOT) {
            return Worker_1.Worker.gameBot;
        }
        else {
            console.error();
            throw new Error("Task " + taskType + " does not exist.");
        }
    };
    Triage.task = function (data, progress, resolve, reject) {
        var fn = this.getWorker(data.type);
        fn(data).then(function () { return resolve; }).catch(function (error) {
            console.error(error);
            reject(error);
        });
    };
    return Triage;
}());
exports.Triage = Triage;
//# sourceMappingURL=Triage.js.map