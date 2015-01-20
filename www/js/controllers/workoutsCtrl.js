angular.module('bench.controllers')

.controller('WorkoutsCtrl', function($scope, $state, $localstorage, Storage, Workouts, Requests) {

  $scope.goToOneRepMax = function(){
    $state.go('app.oneRM');
  };

  var displayWorkouts = function(){
    if (Storage.getOneRepMax()){
      var storedWorkouts = Storage.getWorkouts();
      Workouts.set(storedWorkouts);
      $scope.workouts = Workouts.all();
    }
  };

  displayWorkouts();

});
