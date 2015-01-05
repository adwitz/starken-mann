angular.module('bench.controllers')

.controller('SettingsCtrl', function($scope, $localstorage) {

  var getOneRepMaxValue = function(){
    var oneRepMax = JSON.parse($localstorage.get('max'));
    if (oneRepMax) {
      return oneRepMax;
    }
    return undefined;
  };

  $scope.oneRepMax = getOneRepMaxValue();

});
