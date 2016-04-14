"use strict";
var Config = (function () {
    function Config() {
    }
    Config.DATABASE_SCHEMA = function () {
        return process.env.ACRO_DATABASE_SCHEMA || 'db_acro';
    };
    Config.DATABASE_URL = function () {
        return process.env.ACRO_DATABASE_URL || 'postgres://localhost:5432';
    };
    Config.PORT = function () {
        return parseInt(process.env.ACRO_PORT, 10) || 4000;
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map