
export class Routes {
  
  constructor() {
  }
  
  init(router: any) {
    
    console.log('Initializing routes');
  
    // Our routes
    require('./routes/game')(router);
  }
}
