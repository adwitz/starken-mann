angular.module('starken.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('WorkoutCtrl', function($scope, Workouts) {
  var workouts = Workouts.all();

  $scope.workout = workouts[0];
  $scope.sets = $scope.workout.set;
  console.log($scope.workout);

  $scope.nextWorkout = function(id){
    $scope.workout = workouts[id+1];
    $scope.sets = $scope.workout.set;
    console.log($scope.workout);
  };

  $scope.prevWorkout = function(id){
    $scope.workout = workouts[id-1];
    $scope.sets = $scope.workout.set;
    console.log($scope.workout);
  };

  $scope.disableWorkoutNav = function(id){
    if (id - 1 < 0){
      return true;
    } else if (id + 1 >= workouts.length){
      return true;
    }
  };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
