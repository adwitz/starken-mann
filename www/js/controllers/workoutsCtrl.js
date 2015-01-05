angular.module('bench.controllers')

.controller('WorkoutsCtrl', function($scope, $state, $localstorage, Workouts, Requests) {

  $scope.goToOneRepMax = function(){
    $state.go('app.oneRM');
  };

  var displayWorkouts = function(){
    if ($localstorage.get('max', null)){
      var storedWorkouts = $localstorage.getObject('workouts');
      Workouts.set(storedWorkouts);
      $scope.workouts = Workouts.all();
    }
  };

});
