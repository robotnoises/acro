"use strict";
var QueueConfig = (function () {
    function QueueConfig() {
    }
    QueueConfig.FB_URL = function () {
        return (process.env.FB_NAME) ? "https://" + process.env.FB_NAME + ".firebaseio.com" : '';
    };
    QueueConfig.FB_TOKEN = function () {
        return process.env.FB_TOKEN || '';
    };
    QueueConfig.FB_QUEUEPATH = function () {
        return '/queue';
    };
    QueueConfig.FB_TASKPATH = function () {
        return this.FB_QUEUEPATH + "/tasks";
    };
    return QueueConfig;
}());
exports.QueueConfig = QueueConfig;
//# sourceMappingURL=Config.js.map