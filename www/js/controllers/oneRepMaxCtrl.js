angular.module('bench.controllers')

.controller('OneRepMaxCtrl', function($scope, $state, $localstorage, $ionicModal, $interval, $timeout, OneRepMax, Workouts, Timer, Requests) {

  var timer;

  $scope.max = {};
  $scope.errorMsg = false;
  $scope.currentStepData = OneRepMax.getStep(0);
  $scope.getTimeRemaining = Timer.getTimeRemaining;

  $ionicModal.fromTemplateUrl('templates/modals/unknownOneRepMax.html', {
    scope: $scope
  }).then(function(modal){
    $scope.unknownOneRepMaxModal = modal;
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

  $scope.goToSetOneRepMax = function(){
    $state.go('app.setOneRepMax');
  };

  var goToOneRepMaxSuccess = function(){
    $state.go('app.oneRepMaxSuccess');
  };

  $scope.goToWorkouts = function(){
    $state.go('app.workouts');
  };

  $scope.updateOneRepMaxStep = function(success){
    $scope.currentStepData = $scope.currentStepData.getNext(success);
    $scope.currentStepData.timer && setAndInitiateTimer();
  };

  $scope.openOneRepMaxModal = function(userKnowsOneRepMax){
    clearOneRepMax();
    Timer.stopTimer();
    $scope.userKnowsOneRepMax = userKnowsOneRepMax;
    $scope.unknownOneRepMaxModal.show();
  };

  var validateWeight = function(weight, flowCallback){
    var testedMax = OneRepMax.setMax(weight);
    if (testedMax.success){
      $scope.max.weight = weight;
      flowCallback(true);
    } else {
      $scope.errorMsg = testedMax.message;
    }
  };

  $scope.setKnownOneRepMax = function(weight){
    validateWeight(weight, function(){
      saveOneRepMax(weight, goToOneRepMaxSuccess);
    });
  };

  $scope.setUnknownOneRepMax = function(weight){
    validateWeight(weight, closeModalAndShowNextStep);
  };

  var saveOneRepMax = function(weight, successCallback){
    Requests.getWorkout(weight).then(function(data){
      Workouts.set(data, true);
      successCallback && successCallback();
    }, function(err){
      $scope.errorMsg = err;
    });

  };

  var closeModalAndShowNextStep = function(success){
    $scope.closeOneRepMaxModal();
    $scope.updateOneRepMaxStep(success);
  };

  $scope.closeOneRepMaxModal = function(){
    $scope.errorMsg = null;
    $scope.unknownOneRepMaxModal.hide();
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
