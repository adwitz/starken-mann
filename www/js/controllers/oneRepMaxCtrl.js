angular.module('bench.controllers')

.controller('OneRepMaxCtrl', function($scope, $localstorage, OneRepMax) {
  var storedWorkouts = $localstorage.getObject('workouts');

  Workouts.set(storedWorkouts);

  $scope.workouts = Workouts.all();
});
