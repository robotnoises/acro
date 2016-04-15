import {Config} from './../config/Config';
import {Models} from './Models';
import Sequelize = require('sequelize');

export class Database {
  
  constructor() {  
  }
  
  sync():Promise<any> {
    
    var options = {
      schema: Config.DATABASE_SCHEMA(),
      dialect: 'postgres',
      dialectOptions: {
        ssl: Config.SSL()
      },
      logging: console.log
    };
    
    var connection = new Sequelize(Config.DATABASE_URL(), options);
    var models = new Models();
  
    models.defineAll(connection);
  
    return connection.sync();
  }
}
