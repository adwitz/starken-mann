angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Requests', function($http, $q) {

  return {
    getWorkout: function(weight){
      var d = $q.defer();
      
      $http.get('http://localhost:3000/workouts/' + weight, null, {withCredentials: true})
      .success(function(data){
          d.resolve(data);
          console.log('data success', data);
      }).error(function(data){
          d.reject(data);
          console.log('data error', data);
      });
      return d.promise;
    }
  };

});

