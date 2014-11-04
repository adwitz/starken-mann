var express = require('express');
var fs = require('fs');
var app = express();

var cleanUp = function(item){
  if (item === '' || item === '\r' || item === '\n'){
    return false;
  }
  return true;
};

var setType = function(rep){

  if (rep === 'Neg'){
    return 'negative';
  } else if (rep === 'F'){
    return 'failure';
  } else {
    return 'normal';
  }

};

var processReps = function(reps){
  var processed = reps.map(function(item){
    if (item === 'Neg'){
      return 1;
    } else if (item === 'F'){
      return null;
    } else {
      return Number(item);
    }
  });
  return processed;
};

var sets = [1,2,2,2,2,1,1,2,2,2,2,1,1,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,1,2,2,1,1,1];

var populateSets = function(startIndex, regimen, reps){
  var workout = [], pos;
  var type;
  
  for (var i=0; i<3; i++){
    for (var j=0; j<sets[startIndex + i - 1]; j++){

      type = setType(reps.raw[startIndex + i - 1]);

      workout.push({
        reps: reps.processed[startIndex + i - 1],
        weight: regimen[startIndex + i],
        completed: false,
        type: type
      });   
    }

  }

  return workout;
};

createRepObj = function(repsRow){

  var raw = repsRow;
  var processed = processReps(raw);

  return {
    raw: raw,
    processed: processed
  };
};

var processData = function(data){

  var re = new RegExp('\r', 'g');
  var result = [], processed, reps, oneRMs, oneRM, sets, allWorkoutData = {};
  var rows = data.trim().replace(re, '').split('\n');

  processed = rows.map(function(row, index, array){

    row = row.split(',');

    row = row.filter(function(item){
      return cleanUp(item);
    });
    
    return row;

  });

  reps = createRepObj(processed[2].slice(1));

  oneRMs = processed.slice(4);

  oneRMs.forEach(function(regimen, oneRMIndex, body){
    oneRM = regimen[0];
    allWorkoutData[oneRM] = [];
    for (var i=1; i<regimen.length; i+=3){
      sets = populateSets(i, regimen, reps);
      allWorkoutData[oneRM].push({
        id: Math.floor(i / 3),
        workout: Math.floor(i / 3) + 1,
        completed: false,
        sets: sets
      });
    }
    
  });

  return allWorkoutData;

};

fs.readFile('server/data/bench-data.csv', 'utf-8', function(err, data){
  if (err) throw err;
  
  var processedData = processData(data);

  fs.writeFile('server/data/processed.json', JSON.stringify(processedData), function(err){
    if (err){
      console.log(err);
    } else {
      console.log('wrote data to processed.json');
    }
  });

});
