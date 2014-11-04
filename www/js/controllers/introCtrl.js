angular.module('bench.controllers')

.controller('IntroCtrl', function($scope, $state, $ionicModal, $localstorage, Requests, Workouts){

  $scope.oneRepMax = undefined;
  $scope.errorMsg = false;

  $ionicModal.fromTemplateUrl('templates/modals/oneRepMaxModal.html', {
      scope: $scope
  }).then(function(modal){
      $scope.oneRepMaxModal = modal;
  });
  
  $scope.goToOneRM = function(){
    $state.go('app.oneRM');
  };

  $scope.openOneRepMaxModal = function(){
    $scope.oneRepMaxModal.show();
  };

  $scope.saveOneRepMax = function(weight){
    //save current one RM to localstorage
    Requests.getWorkout(weight).then(function(data){
      console.log('some kind of success:', typeof data);
      $localstorage.set('max', weight);
      Workouts.set(data);
      $scope.closeOneRepMaxModel();
      $state.go('app.workouts');
    }, function(err){
      console.log('err: ', err);
      //show error message
      $scope.errorMsg = err;
    });

  };

  $scope.closeOneRepMaxModel = function(){
    $scope.oneRepMaxModal.hide();
  };

});
