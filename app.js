var db =      require('./data/database');
var server =  require('./server/server');
var api =     require('./api/api');

/*
 * Start starting stuff
*/

console.log('Starting the application');

// Start the server
api.start(server.start());

// Sync the database with its Models 
db.sync().then(function() {
  console.log('Database synchronized');
}).catch(function (err) {
  console.error(err);
});

// Start the Queue (TODO)