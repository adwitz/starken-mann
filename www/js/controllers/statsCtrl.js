angular.module('bench.controllers')

.controller('StatsCtrl', function($scope, Statistics) {

  $scope.data = Statistics.getAllStats();

});
