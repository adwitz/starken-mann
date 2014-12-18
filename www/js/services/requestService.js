angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Requests', function($http, $q, OneRepMax) {

  return {
    getWorkout: function(weight){
      var d = $q.defer();

      var validatedMax = OneRepMax.validate(weight);

      if (!validatedMax.success){
        d.reject('Your 1RM must be between 100 and 580lbs and divisible by 5');
      } else {
        $http.get('http://localhost:3000/workouts/' + weight, null, {withCredentials: true})
        .success(function(data){
          d.resolve(data);
          console.log('data success', data);
        }).error(function(data){
          d.reject(data);
          console.log('data error', data);
        });

      }
      return d.promise;
    }
  };

});
