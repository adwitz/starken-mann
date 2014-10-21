angular.module('starken.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('WorkoutCtrl', function($scope, Workouts) {
  $scope.workouts = Workouts.all();
})

.controller('WorkoutDetailCtrl', function($scope, $stateParams, Workouts) {
  $scope.workout = Workouts.get($stateParams.workoutId);

  $scope.markRepComplete = function($event){
    debugger;
  };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
