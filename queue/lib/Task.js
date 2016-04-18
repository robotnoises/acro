// Task.js
// Various Task-related utility methods
"use strict";
var Firebase = require('firebase');
(function (TASK_TYPE) {
    TASK_TYPE[TASK_TYPE["GAME"] = 0] = "GAME";
})(exports.TASK_TYPE || (exports.TASK_TYPE = {}));
var TASK_TYPE = exports.TASK_TYPE;
var Task = (function () {
    function Task(taskType, data) {
        this.type = taskType;
        this.data = data;
        this.timestamp = Firebase.ServerValue.TIMESTAMP;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=Task.js.map