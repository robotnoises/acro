/**
 * Server
 * 
 * An Express server, to do, uh, something
 * 
 */

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
    
    console.log('Starting the server');
    
    this.server = this.app.listen(this.port, () => {
      console.log(`Server started, listening on port: ${this.port}`);
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
