angular.module('bench.services')

/**
 * A simple example service that returns some data.
 */
.factory('Timer', function($interval) {

  var timer = null;

  var timeRemaining = 0;

  return {

    setTimer: function(duration){
      timeRemaining = duration;
    },

    getTimeRemaining: function(){
      return timeRemaining;
    },

    clockIsRunning: function(){
      if (timeRemaining === 1){
        return false;
      }
      return true;
    },

    startTimer: function(){

      var me = this;

      timer && this.stopTimer();

      var runTimer = function(){
        if (timeRemaining <= 1){
          me.stopTimer();
        } else {
          timeRemaining -= 1;
        }
      };

      timer = $interval(function(){
        runTimer();
      }, 1000);

    },

    stopTimer: function(){
      $interval.cancel(timer);
    }

  };

});
