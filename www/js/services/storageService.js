angular.module('bench.services')

.factory('Storage', function($localstorage, Requests, $q) {


  var privateGetOneRepMax = function(){
    var oneRepMax = $localstorage.get('oneRepMax', null);
    return stringToNumberFromLocalStorage(oneRepMax);
  };

  var stringToNumberFromLocalStorage = function(value){
    if (value){
      return Number(value);
    }
    return value;
  };

  var checkForAndSetMaxWeightLifted = function(workouts){
    var lastCompletedWorkout = workouts[$localstorage.get('lastCompletedWorkout')];
    if (lastCompletedWorkout){
      var lastCompletedWorkoutSets = lastCompletedWorkout.sets;
      var maxWeightLifted = $localstorage.get('maxWeightLifted', 0);
      lastCompletedWorkoutSets.forEach(function(set, index){
        if (Number(set.weight) > Number(maxWeightLifted)){
          $localstorage.set('maxWeightLifted', set.weight);
        }
      });
    }
  };

  var oneRepMaxIsGreater = function(oneRepMax, maxLifted){
    oneRepMax = Number(oneRepMax);
    maxLifted = Number(maxLifted);
    if (oneRepMax > maxLifted){
      return true;
    }
    return false;
  };

  var updateMaxWeightLifted = function(oneRepMax){
    var maxLifted = $localstorage.get('maxWeightLifted', null);
    if (!maxLifted || oneRepMaxIsGreater()){
      $localstorage.set('maxWeightLifted', oneRepMax);
    }
  };

  var setInitalOneRepMax = function(oneRepMax){
    
  };

  return {

    getOneRepMax: function(){
      var oneRepMax = $localstorage.get('oneRepMax', null);
      return stringToNumberFromLocalStorage(oneRepMax);
    },

    getInitialOneRepMax: function(){
      $localstorage.get('initialOneRepMax', null);
    },

    getLastCompletedWorkout: function(){
      var lastCompletedWorkout = $localstorage.get('lastCompletedWorkout', null);
      return stringToNumberFromLocalStorage(lastCompletedWorkout);
    },

    getWorkouts: function(){
      return $localstorage.getObject('workouts');
    },

    getMaxWeightLifted: function(){
      return $localstorage.get('maxWeightLifted', 0);
    },

    setWorkouts: function(workouts){
      $localstorage.setObject('workouts', workouts);
      checkForAndSetMaxWeightLifted(workouts);
    },

    setOneRepMax: function(oneRepMax){
      $localstorage.set('oneRepMax', oneRepMax);
      updateMaxWeightLifted(oneRepMax);
    },

    setLastCompletedWorkout: function(lastCompletedWorkout){
      $localstorage.setObject('lastCompletedWorkout', lastCompletedWorkout);
    }

  };

});
