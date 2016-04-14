"use strict";
var Express = require('express');
var BodyParser = require('body-parser');
var Server = (function () {
    function Server(port) {
        this.port = port;
    }
    Server.prototype.start = function () {
        this.app = Express();
        this.app.use(BodyParser.json());
        this.app.use(BodyParser.urlencoded({ extended: true }));
        this.server = this.app.listen(this.port, function () {
            console.log('Server started');
            // console.log('Listening on port %s...', this.server.address().port);
        });
        if (this.server) {
            return this.app;
        }
        else {
            throw new Error('Server did not start properly');
        }
    };
    Server.prototype.getApp = function () {
        if (this.app) {
            return this.app;
        }
        else {
            throw new Error('App not available');
        }
    };
    Server.prototype.getServer = function () {
        if (this.server) {
            return this.server;
        }
        else {
            throw new Error('Server not available');
        }
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=index.js.map