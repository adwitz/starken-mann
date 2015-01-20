angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Workouts', function(Storage, Requests) {

  var workouts = Storage.getWorkouts();

  var lastCompletedWorkout = Storage.getLastCompletedWorkout();

  var oneRepMax = Storage.getOneRepMax();

  var getAdjustedWorkoutData = function(amount){
    return Requests.getWorkout(Storage.getOneRepMax() + amount);
  };

  var updateRemainingWorkouts = function(changedWeightWorkouts){
    var lastCompleted = Storage.getLastCompletedWorkout();
    var workouts = Storage.getWorkouts();
    var updatedWorkoutList = workouts.map(function(workout, index){
      if (index <= lastCompleted){
        return workout;
      } else {
        return changedWeightWorkouts[index];
      }
    });
    Storage.setWorkouts(updatedWorkoutList);
  };

  return {
    all: function() {
      workouts = Storage.getWorkouts();
      return workouts;
    },
    get: function(id) {
      return workouts[id];
    },
    set: function(data, updateLocalStorage){
      workouts = data.workouts;
      oneRepMax = data.max;
      if (updateLocalStorage){
        Storage.setWorkouts(workouts);
        Storage.setOneRepMax(oneRepMax);
      }
    },
    updateWorkout: function(workout){
      lastCompletedWorkout = workout.id;
      Storage.setLastCompletedWorkout(lastCompletedWorkout);
      /* TODO abstract line below into function that can update one or remaining workouts */
      workouts[workout.id] = workout;
      Storage.setWorkouts(workouts);
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
    },
    increaseOneRepMax: function(){
      var adjustedMaxData = getAdjustedWorkoutData(5).then(function(data){
        updateRemainingWorkouts(adjustedMaxData);
        console.log('successfully retreived new max data', data);
      }, function(err){
        console.log('error retreiving new max data: ', err);
      });

    },
    decreaseOneRepMax: function(){
      var adjustedMaxData = getAdjustedWorkoutData(-5);
      updateRemainingWorkouts(adjustedMaxData);
    }
  };
});
