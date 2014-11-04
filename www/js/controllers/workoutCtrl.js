angular.module('bench.controllers')

.controller('WorkoutCtrl', function($scope, $stateParams, $state, Workouts, $ionicModal) {
  /*TODO add last completed function*/
  
  $scope.lastCompleted = -1;
  $scope.workout = Workouts.get($stateParams.workoutId);
  $scope.isFailureSet = false;
  $scope.failureReps = null;
  $scope.score = null;

  $ionicModal.fromTemplateUrl('templates/modals/failureModal.html', {
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
  
  $ionicModal.fromTemplateUrl('templates/modals/workoutCompleteModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.completeModal = modal;
  });
  $scope.openWorkoutCompleteModal = function() {
    $scope.completeModal.show();
    $scope.workout.completed = true;
    
  };
  $scope.closeWorkoutCompleteModal = function() {
    $scope.completeModal.hide();
    $state.go('app.workouts');
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.completeModal.remove();
  });
  // Execute action on hide modal
  $scope.$on('completeModal.hidden', function() {

  });
  // Execute action on remove modal
  $scope.$on('completeModal.removed', function() {
    // Execute action
  });

  $scope.$watch('workout.completed', function(value){
    if (value === true){
      Workouts.updateWorkout($scope.workout);
    }
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
    $scope.failureModal.hide();
    $scope.openWorkoutCompleteModal();
  };

  var handleFailureRepScore = function(score){
    if (score.change === 0){
      closeFailureOpenComplete();
    }
  };

  $scope.evaluateFailureReps = function(reps){
    $scope.score = Workouts.evaluateFailureReps(reps);
    handleFailureRepScore($scope.score);
  };

  $scope.saveAndCloseModal = function(){
    closeFailureOpenComplete();
  };

  $scope.changeOneRM = function(change){
    if (change === 1){
      // Workouts.increaseOneRM();
    } else if (change === -1){
      //Workouts.decreaseOneRM();
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
