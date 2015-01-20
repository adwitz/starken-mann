angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Storage', function($localstorage, Requests, $q) {

  return {

    getOneRepMax: function(){
      var oneRepMax = $localstorage.get('oneRepMax', null);
      if (oneRepMax){
        return Number(oneRepMax);
      }
      return null;
    },

    getLastCompletedWorkout: function(){
      return $localstorage.getObject('lastCompletedWorkout');
    },

    getWorkouts: function(){
      return $localstorage.getObject('workouts');
    },

    setWorkouts: function(workouts){
      $localstorage.setObject('workouts', workouts);
    },

    setOneRepMax: function(oneRepMax){
      $localstorage.set('oneRepMax', oneRepMax);
    },

    setLastCompletedWorkout: function(lastCompletedWorkout){
      $localstorage.setObject('lastCompletedWorkout', lastCompletedWorkout);
    }

  };

});
