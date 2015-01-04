angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Workouts', function($localstorage) {

  var workouts, max;

  return {
    all: function() {
      workouts = $localstorage.getObject('workouts');
      return workouts;
    },
    get: function(id) {
      return workouts[id];
    },
    set: function(data, updateLocalStorage){
      workouts = data.workouts;
      max = data.max;
      if (updateLocalStorage){
        $localstorage.setObject('workouts', workouts);
        $localstorage.setObject('max', max);
      }
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
      } else if (reps < 3){
        response.change = -1;
      } else {
        response.change = 0;
      }
      response.weight = '';
      return response;
    }
  };
});
