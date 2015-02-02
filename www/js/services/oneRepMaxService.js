angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('OneRepMax', function() {

  var nextMaxAttemptedStep = function(success){
    if (success){
      return oneRepMaxCalculation.steps[4];
    } else if (oneRepMaxCalculation.max){
      return oneRepMaxCalculation.steps[6];
    } else {
      return oneRepMaxCalculation.steps[5];
    }
  };

  var oneRepMaxCalculation = {

    max: null,

    steps: [{
      type: 'lift',
      step: 0,
      content: 'Lift a light weight 4-5 times',
      timer: null,
      getNext: function(){
        return oneRepMaxCalculation.steps[1];
      }
    }, {
      type: 'lift',
      step: 1,
      content: 'Again, lift a light weight 4-5 times',
      timer: 120,
      confirm: false,
      getNext: function(){
        return oneRepMaxCalculation.steps[2];
      }
    }, {
      type: 'lift',
      step: 2,
      content: 'Increase to a weight you can lift three to four times.  Do three to four reps.',
      timer: 180,
      confirm: false,
      getNext: function(){
        return oneRepMaxCalculation.steps[3];
      }
    }, {
      type: 'lift',
      step: 3,
      content: 'Increase to a weight you can lift about once.  Try to do one rep.',
      timer: 180,
      confirm: true,
      getNext: nextMaxAttemptedStep

    }, {
      type: 'lift',
      step: 4,
      content: 'Great job! Increase the weight and try to do one rep.',
      timer: 180,
      confirm: true,
      getNext: nextMaxAttemptedStep
    }, {
      type: 'lift',
      step: 5,
      content: 'That may have been a bit much.  Remove some weight and try again.',
      timer: 180,
      confirm: true,
      getNext: nextMaxAttemptedStep
    }, {
      type: 'completion',
      step: 6,
      content: 'Your one rep max is ',
      timer: null,
      confirm: false,
      getNext: function(){
        return null;
      }
    }]
  };

  return {
    allSteps: function() {
      return oneRepMaxCalculation.steps;
    },
    getStep: function(id) {
      return oneRepMaxCalculation.steps[id];
    },
    getMax: function(){
      return oneRepMaxCalculation.max;
    },
    setMax: function(weight){
      var testedMax = this.validate(weight);
      if (testedMax.success){
        oneRepMaxCalculation.max = weight;
      }
      return testedMax;
    },
    validate: function(weight){
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
