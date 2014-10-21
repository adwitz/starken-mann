angular.module('starken.services')

/**
 * A simple example service that returns some data.
 */
.factory('Workouts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var workouts = [
    { id: 0, workout: 1, sets: [{reps: 5, weight: 100, completed: false, type: 'normal'},
                                {reps: 5, weight: 100, completed: false, type: 'normal'},
                                {reps: 3, weight: 115, completed: false, type: 'normal'},
                                {reps: 3, weight: 115, completed: false, type: 'normal'},
                                {reps: 2, weight: 130, completed: false, type: 'normal'}]},
    { id: 1, workout: 2, sets: [{reps: 3, weight: 100, completed: false, type: 'normal'},
                                {reps: 3, weight: 100, completed: false, type: 'normal'},
                                {reps: 2, weight: 115, completed: false, type: 'normal'},
                                {reps: 2, weight: 115, completed: false, type: 'normal'},
                                {reps: 1, weight: 130, completed: false, type: 'negative'}]},
    { id: 2, workout: 3, sets: [{reps: 5, weight: 100, completed: false, type: 'normal'},
                                {reps: 5, weight: 100, completed: false, type: 'normal'},
                                {reps: 3, weight: 115, completed: false, type: 'normal'},
                                {reps: 3, weight: 115, completed: false, type: 'normal'},
                                {reps: 2, weight: 130, completed: false, type: 'normal'}] },
    { id: 3, workout: 4, sets: [{reps: 3, weight: 100, completed: false, type: 'normal'},
                                {reps: 3, weight: 100, completed: false, type: 'normal'},
                                {reps: 2, weight: 115, completed: false, type: 'normal'},
                                {reps: 2, weight: 115, completed: false, type: 'normal'},
                                {reps: null, weight: 130, completed: false, type: 'failure'}] }
  ];

  return {
    all: function() {
      return workouts;
    },
    get: function(id) {
      // Simple index lookup
      return workouts[id];
    }
  }
});

