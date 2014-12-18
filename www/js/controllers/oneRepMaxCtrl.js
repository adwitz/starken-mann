angular.module('bench.controllers')

.controller('OneRepMaxCtrl', function($scope, $state, $localstorage, $ionicModal, $interval, $timeout, OneRepMax, Workouts) {

  var timer;
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

    timer && stopTimer();

    $scope.countdown = true;
    $scope.timeRemaining = $scope.currentStepData.timer;
    $timeout(function(){
      startTimer();
    }, 500);
  };

  var startTimer = function(){

    var runTimer = function(){

      if ($scope.timeRemaining <= 0){
        stopTimer();
        $scope.countdown = false;
      } else {
        $scope.timeRemaining -= 1;
        console.log($scope.timeRemaining);
      }
    };
    timer = $interval(function(){
      runTimer();
    }, 1000);
  };

  var stopTimer = function(){
    $interval.cancel(timer);
  };

  var moveToNextStep = function(start, success){

    if (start){
      return $scope.currentStepData;
    }

    var currentStep = $scope.currentStepData.step;

    if (currentStep < 3){
      return OneRepMax.get(currentStep + 1);
    } else if (success){
      return OneRepMax.get(4);
    } else if (success === false && !$scope.oneRepMax){
      return OneRepMax.get(5);
    } else if (success === false && $scope.oneRepMax){
      saveOneRepMax($scope.oneRepMax);
      return OneRepMax.get(6);
    }
  };

  $scope.updateOneRepMaxStep = function(start, success){
    $state.go('app.calculateOneRepMax');
    $scope.currentStepData = moveToNextStep(start, success);
    $scope.currentStepData.timer && setAndInitiateTimer();
  };

  $scope.openOneRepMaxModal = function(userKnowsOneRepMax){
    stopTimer();
    $scope.userKnowsOneRepMax = userKnowsOneRepMax;
    $scope.oneRepMaxModal.show();
  };

  $scope.setOneRepMax = function(weight){
    var testedMax = OneRepMax.validate(weight);
    if (testedMax.success){
      $scope.oneRepMax = weight;
      $scope.closeOneRepMaxModal();
      $scope.updateOneRepMaxStep(false, true);
    } else {
      $scope.errorMsg = testedMax.message;
    }
  };

  var saveOneRepMax = function(weight){
    //save current one RM to localstorage
    Requests.getWorkout(weight).then(function(data){
      console.log('some kind of success:', typeof data);
      /* This local storage save could be added to the set method */
      $localstorage.set('max', weight);
      Workouts.set(data);
      $scope.closeOneRepMaxModal();
      $state.go('app.workouts');
    }, function(err){
      console.log('err: ', err);
      //show error message
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
