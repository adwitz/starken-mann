angular.module('bench.controllers')

.controller('OneRepMaxCtrl', function($scope, $state, $localstorage, $ionicModal, $interval, $timeout, OneRepMax, Workouts) {

  $scope.oneRepMax = null;
  $scope.errorMsg = false;
  $scope.countdown = false;
  $scope.currentStepData = OneRepMax.get(0);

  $ionicModal.fromTemplateUrl('templates/modals/oneRepMaxModal.html', {
    scope: $scope
  }).then(function(modal){
    $scope.oneRepMaxModal = modal;
  });

  var setAndInitiateTimer = function(){
    $scope.countdown = true;
    $scope.timeRemaining = $scope.currentStepData.timer;
    $timeout(function(){
      startTimer();
    }, 500);
  };

  var startTimer = function(){

    var runTimer = function(){

      if ($scope.timeRemaining <= 0){
        $interval.cancel(timer);
        $scope.countdown = false;
      } else {
        $scope.timeRemaining -= 1;
        console.log($scope.timeRemaining);
      }
    };
    var timer = $interval(function(){
      runTimer();
    }, 750);
  };

  //we need to add a kill process to the timer for whenever there is a change in view

  var moveToNextStep = function(start, success){

    if (start){
      return $scope.currentStep;
    }

    var currentStep = $scope.currentStepData.step;

    if (currentStep < 3){
      return $scope.currentStepData = OneRepMax.get(currentStep + 1);
    } else if (success){
      return $scope.currentStepData = OneRepMax.get(4);
    } else if (success === false && !$scope.oneRepMax){
      return $scope.currentStepData = OneRepMax.get(5);
    } else if (success === false && $scope.oneRepMax){
      //show current max success response
      //prompt to go to workout section
    }
  };

  $scope.updateOneRepMaxStep = function(start, success){
    $state.go('app.calculateOneRepMax');
    $scope.currentStepData = moveToNextStep(start, success);
    $scope.currentStepData.timer && setAndInitiateTimer();
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
