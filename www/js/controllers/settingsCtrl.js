angular.module('bench.controllers')

.controller('SettingsCtrl', function($scope, $localstorage, $state) {

  var getOneRepMaxValue = function(){
    var oneRepMax = $localstorage.get('max');
    if (oneRepMax) {
      return JSON.parse(oneRepMax);
    }
    return undefined;
  };

  $scope.oneRepMax = getOneRepMaxValue();

  $scope.goToSetOneRepMax = function(){
    $state.go('app.oneRM');
  };

});
