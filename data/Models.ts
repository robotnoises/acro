import Sequelize = require('sequelize');

// Todo: this are Arrays because That's what sequelize is expecting...

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
]

var SCORE_BONUSES = [
  'NONE',
  'SPEED'
]

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Model definitions ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export interface IModel {
  define(connection: any, name: string, model: Object): void;
  modelName: string;
}

class BaseModel implements IModel {
  
  modelName: string;
  
  constructor(name: string) {
    this.modelName = name;
  }

  define(connection: any, name: string, model: Object) {
    try {
      return connection.define(name, model);  
    } catch (ex) {
      console.error(ex);
    }
  }
}

class User extends BaseModel {
  
  user_name: any;
  
  constructor(sqName: string) {
    super(sqName);
    this.user_name = Sequelize.STRING;
  }
}

class Game extends BaseModel {
  
  state: any;
  winner: any;
  
  constructor(sqName: string) {
    super(sqName);
    this.state = Sequelize.ENUM(GAME_STATES);
    this.winner = Sequelize.INTEGER;
  }
}

class Round extends BaseModel {
  
  stage: any;
  acronym: any;
  validator: any;
  
  constructor(sqName: string) {
    super(sqName);
    this.stage = Sequelize.ENUM(ROUND_STAGES),
    this.acronym = Sequelize.ARRAY(Sequelize.STRING),
    this.validator = Sequelize.STRING
  }
}

class Score  extends BaseModel {
  
  score: any; 
  bonus: any
    
  constructor(sqName: string) {
    super(sqName);
    this.score = Sequelize.INTEGER;
    this.bonus = Sequelize.ENUM(SCORE_BONUSES);
  }
}

export class Models {
  
  User = User; 
  Game = Game;
  Round = Round;
  Score = Score;
  
  constructor() {
  }
  
  defineAll(connection: any) {
    
    var models = [];
    
    if (connection && connection.define) {

      // Define each Model
      
      var definedModels = {};
      
      models.push(new User('user'));
      models.push(new Game('game'));
      models.push(new Round('round'));
      models.push(new Score('score'));
      
      models.forEach((m: IModel) => {
        var name = m.modelName;
        delete m.modelName;
        // Define the models in Sequelize
        definedModels[name] = m.define(connection, name, m);
      });

      // Define Model Associations
      
      // A game has many rounds
      definedModels['game'].hasMany(definedModels['round']);
      // A round has many scores
      definedModels['round'].hasMany(definedModels['score']);
    } else {
      console.error('A valid Sequelize connection is required.');
    }
  }
}
