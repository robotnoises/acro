var db =      require('./data/database');
var server =  require('./server/server');
var api =     require('./api/api');

console.log('Starting the application');

api.start(server.start());

db.sync().then(function() {
  console.log('Database synchronized');
}).catch(function (err) {
  console.error(err);
});