angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'dashboardCtrl'
  })

  .state('temperature', {
    url: '/temperature',
    templateUrl: 'templates/temperature.html',
    controller: 'temperatureCtrl'
  })

  .state('waterLevel', {
    url: '/page3',
    templateUrl: 'templates/waterLevel.html',
    controller: 'waterLevelCtrl'
  })

  .state('scheduleLighting', {
    url: '/scheduleLightng',
    templateUrl: 'templates/scheduleLighting.html',
    controller: 'scheduleLightingCtrl'
  })

  .state('scheduleFood', {
    url: '/scheduleFood',
    templateUrl: 'templates/scheduleFood.html',
    controller: 'scheduleFoodCtrl'
  })

$urlRouterProvider.otherwise('/dashboard')

  

});