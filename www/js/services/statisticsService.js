angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Statistics', function(Storage) {

  var getLastCompletedWorkout = function(){
    var lastCompleted = Storage.getLastCompletedWorkout();
    if (lastCompleted !== null){
      return lastCompleted + 1;
    }
    return 0;
  };

  var getOneRepMax = function(){
    var oneRepMax = Storage.getOneRepMax();
    return oneRepMax ? oneRepMax : 0;
  };

  return {
    getAllStats: function(){
      return {
        oneRepMax: getOneRepMax(),
        initialOneRepMax: Storage.getInitialOneRepMax(),
        workoutsCompleted: getLastCompletedWorkout(),
        maxWeightLifted: Storage.getMaxWeightLifted()
      };
    }
  };

});
