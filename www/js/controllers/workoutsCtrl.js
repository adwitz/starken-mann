angular.module('bench.controllers')

.controller('WorkoutsCtrl', function($scope, $localstorage, Workouts, Requests) {
  var storedWorkouts = $localstorage.getObject('workouts');

  Workouts.set(storedWorkouts);

  $scope.workouts = Workouts.all();
});
