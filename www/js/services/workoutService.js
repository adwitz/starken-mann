angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Workouts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data

  var workouts;

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
    },
    setRepValue: function(workout, set, key, value){
      workout.sets[set][key] = value;
    },
    isFailureSet: function(sets){
      if (sets[sets.length-1].type === 'failure'){
        return true;
      }
      return false;
    }
  }
});

