var express = require('express');
var fs = require('fs');
var app = express();

var cleanUp = function(item){
  if (item === '' || item === '\r' || item === '\n'){
    return false;
  }
  return true;
};

var sets = [[1,2,2], [2,2,1], [1,2,2], [2,2,1], [1,2,1], [2,2,1], [2,2,1],
            [2,2,1], [2,2,1], [2,2,1], [2,2,1], [2,2,1], [1,2,2], [1,1,1]];

fs.readFile('data/bench-data.csv', 'utf-8', function(err, data){
  if (err) throw err;
  
  var re = new RegExp('\r', 'g');
  var result = [];
  var rows = data.trim().replace(re, '').split('\n');

  var processed = [];

  processed = rows.map(function(row, index, array){

    row = row.split(',');

    row = row.filter(function(item){
      return cleanUp(item);
    });
    
    return row;

  });
  
  var reps = processed[2].slice(1);

  return result;

});


//{reps: 5, weight: 100, completed: false, type: 'normal'},