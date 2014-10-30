angular.module('bench.controllers')

.controller('WorkoutCtrl', function($scope, $stateParams, Workouts, $ionicModal) {
  /*TODO add last completed function*/
  
  $scope.lastCompleted = -1;
  $scope.workout = Workouts.get($stateParams.workoutId);
  $scope.isFailureSet = false;
  $scope.failureReps = null;
  
  $ionicModal.fromTemplateUrl('templates/workoutCompleteModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openWorkoutCompleteModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.$watch('lastCompleted', function(){
    if($scope.lastCompleted === $scope.workout.sets.length - 1){
      $scope.isFailureSet = Workouts.isFailureSet($scope.workout.sets);
      $scope.openWorkoutCompleteModal();
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

    $scope.evaluateFailureReps = function(reps){
      $scope.changeWeight = Workouts.evaluateFailureReps(reps);
    };

  };

});
