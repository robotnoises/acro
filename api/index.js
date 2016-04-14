"use strict";
var Express = require('express');
var Routes_1 = require('./Routes');
var Api = (function () {
    function Api() {
    }
    Api.prototype.start = function (app) {
        var router = Express.Router();
        var routes = new Routes_1.Routes();
        app.use('/api', router);
        routes.init(router);
    };
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=index.js.map