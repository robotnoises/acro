"use strict";
var Routes = (function () {
    function Routes() {
    }
    Routes.prototype.init = function (router) {
        console.log('Initializing routes');
        // Our routes
        require('./routes/game')(router);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map