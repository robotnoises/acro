"use strict";
var Config = (function () {
    function Config() {
    }
    Config.FB_URL = function () {
        return ''; // (process.env.FB_NAME) ? `https://${process.enc.FB_NAME}.firebaseio.com` : '';
    };
    Config.FB_TOKEN = function () {
        return ''; // process.env.FB_TOKEN || '';
    };
    Config.FB_QUEUEPATH = function () {
        return '/queue';
    };
    Config.FB_TASKPATH = function () {
        return this.FB_QUEUEPATH + "/tasks";
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map