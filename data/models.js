var Sequelize = require('sequelize');

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Globals /////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

var GAME_STATES = [
  'INPROG', 
  'COMPLETE'
];

var ROUND_STAGES = [
  'ROUND_1', 
  'ROUND_2', 
  'ROUND_3', 
  'ROUND_4', 
  'ROUND_5', 
  'ROUND_6', 
  'FACEOFF_1', 
  'FACEOFF_2', 
  'FACEOFF_3'
];

var SCORE_BONUSES = [
  'NONE',
  'SPEED'
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Model definitions ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

var User = {
  user_name: Sequelize.STRING
};

var Game = {
  state: Sequelize.ENUM(GAME_STATES),
  winner: Sequelize.INTEGER
};

var Round = {
  stage: Sequelize.ENUM(ROUND_STAGES),
  acronym: Sequelize.ARRAY,
  validator: Sequelize.STRING
};

var Score = {
  score: Sequelize.INTEGER,
  bonus: Sequelize.ENUM(SCORE_BONUSES)
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Private methods /////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

function _define(connection, modelName, model) {
  try {
    return connection.define(modelName, model);  
  } catch (ex) {
    console.error(ex);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Public methods //////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

function _defineAll(connection) {
  
  if (connection && connection.define) {
    
    // Define each Model
    
    var user = _define(connection, 'user', User);
    var game = _define(connection, 'game', Game);
    var round = _define(connection, 'round', Round);
    var score = _define(connection, 'score', Score);
    
    // Define Model Associations
    
    // user.belongsTo(game);
    // round.belongsTo(game);
    // score.hasMany(user, round);
  } else {
    console.error('A valid Sequelize connection is required.');
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Export //////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  defineAllModels: _defineAll
}