function _init(router) {
  
  console.log('Initializing routes');
  
  // Our routes
  
  require('./routes/game')(router);
}

module.exports = {
  init: _init
};