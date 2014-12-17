angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('OneRepMax', function() {

  var oneRepMaxSteps = [{
    type: 'lift',
    step: 0,
    content: 'Lift a light weight 4-5 times',
    timer: null
  }, {
    type: 'lift',
    step: 1,
    content: 'Again, lift a light weight 4-5 times',
    timer: 120,
    confirm: false
  }, {
    type: 'lift',
    step: 2,
    content: 'Increase to a weight you can lift three to four times.  Do three to four reps.',
    timer: 180,
    confirm: false,
  }, {
    type: 'lift',
    step: 3,
    content: 'Increase to a weight you can lift about once.  Try to do one rep.',
    timer: 180,
    confirm: true,
  }, {
    type: 'lift',
    step: 4,
    content: 'Great job! Increase the weight and try to do one rep.',
    timer: 180,
    confirm: true
  }, {
    type: 'lift',
    step: 5,
    content: 'That may have been a bit much.  Remove some weight and try again.',
    timer: 180,
    confirm: false
  }, {
    type: 'success',
    step: 6,
    content: 'Your one rep max is ',
    timer: null,
    confirm: false
  }];

  return {
    all: function() {
      return oneRepMaxSteps;
    },
    get: function(id) {
      return oneRepMaxSteps[id];
    },
    validateOneRepMax: function(weight){
      var response = {};
      if (weight % 5 !== 0 || weight > 580 || weight < 100){
        response.success = false;
        response.message = 'Your 1RM must be between 100 and 580lbs and divisible by 5';
      } else {
        response.success = true;
      }
      return response;
    }
  };
});
