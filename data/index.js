"use strict";
var Config_1 = require('./../config/Config');
var Models_1 = require('./Models');
var Sequelize = require('sequelize');
var Database = (function () {
    function Database() {
    }
    Database.prototype.sync = function () {
        var options = {
            schema: Config_1.Config.DATABASE_SCHEMA(),
            dialect: 'postgres',
            dialectOptions: {
                ssl: true
            },
            logging: console.log
        };
        var connection = new Sequelize(Config_1.Config.DATABASE_URL(), options);
        var models = new Models_1.Models();
        models.defineAll(connection);
        return connection.sync();
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=index.js.map