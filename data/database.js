var Sequelize = require('sequelize');
var models = require('./models');

var url = 'postgres://xytqofnhurvldz:l1ExkEuRBmR52hSsyq0Wn6ZHFS@ec2-54-83-17-9.compute-1.amazonaws.com:5432/dctdct2vhr91u1';
var username = 'xytqofnhurvldz';
var password = 'l1ExkEuRBmR52hSsyq0Wn6ZHFS';

var options = {
  schema: 'db_acro',
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