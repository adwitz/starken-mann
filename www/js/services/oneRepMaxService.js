angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('OneRepMax', function() {

  var oneRepMaxSteps = [{
    type: 'lift',
    content: 'Lift a light weight 4-5 times'
  }, {
    type: 'lift',
    content: 'Again, lift a light weight 4-5 times',
    timer: 120
  }, {
    type: 'lift',
    content: 'Increase to a weight you can lift three to four times.  Do three to four reps.',
    timer: 180
  }, {
    type: 'lift',
    content: 'Increase to a weight you can lift about once.  Try to do one rep.',
    timer: 180
  },{
    type: 'info',
    content: 'Were you able to do one rep?',
    confirm: true
  },{
    type: 'lift',
    content: 'Great job! Increase the weight and try to do one rep.',
    timer: 180
  }, {
    type: 'lift',
    content: 'That may have been a bit much.  Remove some weight and try again.',
    timer: 180
  }];

  return {
    all: function() {
      return workouts;
    },
    get: function(id) {
      // Simple index lookup
      return workouts[id];
    },
    set: function(data){
      workouts = data;
      $localstorage.setObject('workouts', workouts);
    },
    updateWorkout: function(workout){
      workouts[workout.id] = workout;
      $localstorage.setObject('workouts', workouts);
    },
    setRepValue: function(workout, set, key, value){
      workout.sets[set][key] = value;
    },
    isFailureSet: function(sets){
      if (sets[sets.length-1].type === 'failure'){
        return true;
      }
      return false;
    },
    evaluateFailureReps: function(reps){
      var response = {
        reps: reps
      };
      if (reps >= 5){
        response.change = 1;
        response.weight = '';
      } else if (reps < 3){
        response.change = -1;
        response.weight = '';
      } else {
        response.change = 0;
        response.weight = '';
      }
      console.log(response);
      return response;
    }
  };
});

