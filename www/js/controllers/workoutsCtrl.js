angular.module('bench.controllers')

.controller('WorkoutsCtrl', function($scope, $state, Storage, Workouts) {

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
