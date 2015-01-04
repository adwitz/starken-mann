angular.module('bench.controllers')

.controller('OneRepMaxCtrl', function($scope, $state, $localstorage, $ionicModal, $interval, $timeout, OneRepMax, Workouts, Timer) {

  var timer;

  $scope.errorMsg = false;
  $scope.currentStepData = OneRepMax.getStep(0);
  $scope.getTimeRemaining = Timer.getTimeRemaining;

  $ionicModal.fromTemplateUrl('templates/modals/oneRepMaxModal.html', {
    scope: $scope
  }).then(function(modal){
    $scope.oneRepMaxModal = modal;
  });

  var clearOneRepMax = function(){
    $scope.max = {};
  };

  var setAndInitiateTimer = function(){

    $scope.clockIsRunning = Timer.clockIsRunning;
    Timer.setTimer($scope.currentStepData.timer);
    $timeout(function(){
      Timer.startTimer($scope.timeRemaining);
    }, 500);
  };

  $scope.goToOneRepMaxSequence = function(){
    $state.go('app.calculateOneRepMax');
  };

  $scope.updateOneRepMaxStep = function(success){
    $scope.currentStepData = $scope.currentStepData.getNext(success);
    $scope.currentStepData.timer && setAndInitiateTimer();
  };

  $scope.openOneRepMaxModal = function(userKnowsOneRepMax){
    clearOneRepMax();
    Timer.stopTimer();
    $scope.userKnowsOneRepMax = userKnowsOneRepMax;
    $scope.oneRepMaxModal.show();
  };

  $scope.setOneRepMax = function(weight){
    var testedMax = OneRepMax.setMax(weight);
    if (testedMax.success){
      $scope.max.weight = weight;
      $scope.closeOneRepMaxModal();
      $scope.updateOneRepMaxStep(true);
    } else {
      $scope.errorMsg = testedMax.message;
    }
  };

  var saveOneRepMax = function(weight){
    Requests.getWorkout(weight).then(function(data){
      console.log('some kind of success:', typeof data);
      /* This local storage save could be added to the set method */
      $localstorage.set('max', weight);
      Workouts.set(data);
      $scope.closeOneRepMaxModal();
      $state.go('app.workouts');
    }, function(err){
      console.log('err: ', err);
      $scope.errorMsg = err;
    });

  };

  $scope.closeOneRepMaxModal = function(){
    $scope.errorMsg = null;
    $scope.oneRepMaxModal.hide();
  };

  $scope.toggleUserOneRepMax = function(){
    $scope.userKnowsOneRepMax = !$scope.userKnowsOneRepMax;
  };

  $scope.liftFail = function(){
    $scope.closeOneRepMaxModal();
    $scope.updateOneRepMaxStep(false, false);
  };
});
