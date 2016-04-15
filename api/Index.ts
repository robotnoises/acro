import Express = require('express');
import {Routes} from './Routes';

export class Api {
  
  constructor() {
  }
  
  start(app: any) {
    var router = Express.Router();
    var routes = new Routes();
    app.use('/api', router);  
    routes.init(router);
  }
}
