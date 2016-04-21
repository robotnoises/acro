import Sequelize = require('sequelize');

// Todo: these are Arrays because that's what sequelize is expecting...

var GAME_STATES = [
  'INPROG',
  'COMPLETE'
];

var ROUND_STAGES = [
  'ROUND_PRE',
  'ROUND_1', 
  'ROUND_2', 
  'ROUND_3', 
  'ROUND_4', 
  'ROUND_5', 
  'ROUND_6', 
  'FACEOFF_1', 
  'FACEOFF_2', 
  'FACEOFF_3',
  'FACEOFF_WINNER'
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
  
  private definedModels: Object;
  
  constructor() {
    this.definedModels = {};
  }
  
  defineModels(connection: any) {
    
    var models = [];
    
    if (connection && connection.define) {

      // Define each Model
      
      models.push(new User('user'));
      models.push(new Game('game'));
      models.push(new Round('round'));
      models.push(new Score('score'));
      
      models.forEach((m: IModel) => {
        var name = m.modelName;
        delete m.modelName;
        // Define the models in Sequelize
        this.definedModels[name] = m.define(connection, name, m);
      });
      
      console.log('Sequelize Models defined.');
    } else {
      console.error('A valid Sequelize connection is required.');
    }
  }
  
  createAssociations() {

    //Define Model Associations
    
    if (Object.keys(this.definedModels).length > 0) {
      //A game has many rounds
      this.definedModels['game'].hasMany(this.definedModels['round']);
      //A round has many scores
      this.definedModels['round'].hasMany(this.definedModels['score']);
      
      console.log('Sequelize Models associations defined.');
    } else {
      throw new Error('There are no Sequelize Models defined.');
    }
  }
}
