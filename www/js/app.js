// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bench', ['ionic', 'ionic.utils', 'bench.controllers', 'bench.services'])

.run(function($ionicPlatform, $location, $state, $localstorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (!$localstorage.get('max', null)){
      $state.go('app.intro');
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.intro', {
      url: "/intro",
      views: {
        'menuContent' :{
          templateUrl: "templates/intro.html",
          controller: 'IntroCtrl'
        }
      }
    })

    .state('app.oneRM', {
      url: "/oneRM",
      views: {
        'menuContent' :{
          templateUrl: "templates/oneRM.html",
          controller: 'OneRepMaxCtrl'
        }
      }
    })

    .state('app.calculateOneRepMax', {
      url: "/oneRM/calculate/:instructionId",
      views: {
        'menuContent': {
          templateUrl: "templates/oneRepMaxDetail.html",
          controller: 'OneRepMaxCtrl'
        }
      }
    })

    .state('app.setOneRepMax', {
      url: "/oneRM/set",
      views: {
        'menuContent': {
          templateUrl: "templates/setOneRepMax.html",
          controller: 'OneRepMaxCtrl'
        }
      }
    })

    .state('app.oneRepMaxSuccess', {
      url: "/oneRM/success",
      views: {
        "menuContent": {
          templateUrl: "templates/oneRepMaxSuccess.html",
          controller: 'OneRepMaxCtrl'
        }
      }
    })

    .state('app.workouts', {
      url: "/workouts",
      views: {
        'menuContent': {
          templateUrl: "templates/workouts.html",
          controller: 'WorkoutsCtrl'
        }
      }
    })

    .state('app.workout', {
      url: "/workouts/:workoutId",
      views: {
        'menuContent': {
          templateUrl: "templates/workout.html",
          controller: 'WorkoutCtrl'
        }
      }
    })

    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent': {
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/workouts');
});
