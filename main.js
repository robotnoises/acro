var System = require('systemjs');

global.ts = require('typescript');

System.transpiler = 'traceur';

// loads './App.js' from the current directory
System.import('./App.js').then(function(m) {
  console.log(m);
});