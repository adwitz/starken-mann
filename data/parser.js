var express = require('express');
var fs = require('fs');
var app = express();

fs.readFile('data/bench-data.csv', 'utf-8', function(err, data){
  if (err) throw err;
  
  var result = [];
  var lines = data.trim().split('\n');

  return result;

});
