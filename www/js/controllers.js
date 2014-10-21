angular.module('bench.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('WorkoutsCtrl', function($scope, Workouts) {
  $scope.workouts = Workouts.all();
})

.controller('WorkoutCtrl', function($scope, $stateParams, Workouts, $ionicModal) {
  /*TODO add last completed function*/
  $scope.lastCompleted = -1;
  $scope.workout = Workouts.get($stateParams.workoutId);
  console.log($scope.workout);
  console.log($scope.sets);
  $ionicModal.fromTemplateUrl('templates/failure-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
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

  // $scope.$watch(function(){});

  $scope.$watch('lastCompleted', function(){
    if($scope.lastCompleted === $scope.workout.sets.length - 1 && Workouts.isFailureSet($scope.workout.sets)){
      $scope.openModal();
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

    // getFailureReps(set);

  };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
