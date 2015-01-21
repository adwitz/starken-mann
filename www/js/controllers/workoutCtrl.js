angular.module('bench.controllers')

.controller('WorkoutCtrl', function($scope, $stateParams, $state, Workouts, $ionicModal) {
  /*TODO add last completed function*/

  $scope.lastCompleted = -1;
  $scope.workout = Workouts.get($stateParams.workoutId);
  $scope.isFailureSet = false;
  $scope.failureReps = null;
  $scope.score = null;

  $ionicModal.fromTemplateUrl('templates/modals/failure.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.failureModal = modal;
  });

  $scope.openFailureModal = function(){
    $scope.failureModal.show();
  };

  $scope.closeFailureModal = function(){
    $scope.failureModal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/modals/workoutComplete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.completeModal = modal;
  });

  $scope.openWorkoutCompleteModal = function() {
    setWorkoutComplete();
    $scope.completeModal.show();
  };

  $scope.closeWorkoutCompleteModal = function() {
    $scope.completeModal.hide();
    $state.go('app.workouts');
  };

  $scope.$on('$destroy', function() {
    $scope.completeModal.remove();
  });

  $scope.$on('completeModal.hidden', function() {

  });

  $scope.$on('completeModal.removed', function() {

  });

  $scope.$watch('lastCompleted', function(value){
    if(value === $scope.workout.sets.length - 1){
      var isFailureSet = Workouts.isFailureSet($scope.workout.sets);
      if (isFailureSet){
        $scope.openFailureModal();
      } else {
        $scope.openWorkoutCompleteModal();
      }

    }
  });

  $scope.markRepComplete = function(set, sets, $index){
    if ($scope.lastCompleted + 1 === $index){
      $scope.lastCompleted = $index;
      set.completed = true;
    } else if ($scope.lastCompleted === $index){
      $scope.lastCompleted = $index - 1;
      set.completed = false;
    } else if ($index === sets.length - 1 && set.completed){
      $scope.lastCompleted = $index - 1;
      set.completed = false;
    }

  };

  var closeFailureOpenComplete = function(){
    $scope.closeFailureModal();
    $scope.openWorkoutCompleteModal();
  };

  var handleFailureRepScore = function(score){
    if (score.change === 0){
      closeFailureOpenComplete();
    }
  };

  var setWorkoutComplete = function(){
    $scope.workout.completed = true;
    Workouts.updateWorkout($scope.workout);
  };

  $scope.evaluateFailureReps = function(reps){
    $scope.score = Workouts.evaluateFailureReps(reps);
    handleFailureRepScore($scope.score);
  };

  $scope.saveAndCloseModal = function(){
    closeFailureOpenComplete();
  };

  $scope.adjustOneRepMax = function(change){
    if (change === 1){
      Workouts.increaseOneRepMax();
    } else if (change === -1){
      Workouts.decreaseOneRepMax();
    }

    $scope.saveAndCloseModal();
  };

  $scope.showChangeConfirmation = function(){
    if ($scope.score === null){
      return false;
    } else if ($scope.score.change === 1 || $scope.score.change === -1){
      return true;
    }
  };

});
