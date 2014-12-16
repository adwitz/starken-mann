angular.module('bench.controllers')

.controller('IntroCtrl', function($scope, $state, $ionicModal, $localstorage, Requests, Workouts){

  $scope.goToOneRM = function(){
    $state.go('app.oneRM');
  };

});
