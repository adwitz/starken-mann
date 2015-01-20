angular.module('bench.controllers')

.controller('SettingsCtrl', function($scope, $state, Storage) {

  var getOneRepMaxValue = function(){
    var oneRepMax = Storage.getOneRepMax();
    if (oneRepMax) {
      return JSON.parse(oneRepMax);
    }
    return oneRepMax;
  };

  $scope.oneRepMax = getOneRepMaxValue();

  $scope.goToSetOneRepMax = function(){
    $state.go('app.oneRM');
  };

});
