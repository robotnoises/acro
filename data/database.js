var Sequelize = require('sequelize');
var config = require('./../config/config');
var models = require('./models');

var url = config.DATABASE_URL;

var options = {
  schema: config.DATABASE_SCHEMA,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  logging: console.log
};

function _sync() {

  var connection = new Sequelize(url, options);
  
  models.defineAllModels(connection);
  
  return connection.sync();
}

module.exports = {
  sync: _sync
};