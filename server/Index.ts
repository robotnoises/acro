import Express = require('express');
import BodyParser = require('body-parser');

export class Server {
  
  app: any;
  server: any;
  port: number;
  
  constructor(port: number) {    
    this.port = port;
  }

  start(): any {

    this.app = Express();
  
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({extended: true }));

    this.server = this.app.listen(this.port, function () {
      console.log('Server started');
      // console.log('Listening on port %s...', this.server.address().port);
    });
    
    if (this.server) {
      return this.app;  
    } else {
      throw new Error('Server did not start properly');
    }
  }

  getApp() {
    if (this.app) {
      return this.app;
    } else {
      throw new Error('App not available');
    }
  }

  getServer() {
    if (this.server) {
      return this.server;
    } else {
      throw new Error('Server not available');
    }
  }
}
