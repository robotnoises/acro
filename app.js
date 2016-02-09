var db = require('./data/database.js');

console.log('Starting the application');

db.sync().then(function() {
  console.log('Database synchronized')
}).catch(function (err) {
  console.error(err);
});