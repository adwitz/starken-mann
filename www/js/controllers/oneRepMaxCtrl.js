angular.module('bench.controllers')

.controller('OneRepMaxCtrl', function($scope, $state, $localstorage, $ionicModal, $interval, $timeout, OneRepMax, Workouts, Timer, Requests) {

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

  $scope.validateAndSetOneRepMax = function(weight){
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
      Workouts.set(data, true);
      $scope.closeOneRepMaxModal();
    }, function(err){
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
    if (OneRepMax.getMax()){
      saveOneRepMax(OneRepMax.getMax());
    }
    $scope.closeOneRepMaxModal();
    $scope.updateOneRepMaxStep(false, false);
  };
});
