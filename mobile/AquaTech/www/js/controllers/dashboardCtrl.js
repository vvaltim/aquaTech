angular.module('app.controllers')
.controller('dashboardCtrl', function($scope, $ionicPopup){
    $scope.buttonWaterLevel = function() {
      $ionicPopup.alert({
       title: 'Coming Soon',
       template: 'Não há nada para ver aqui 💩'
     });
    }

    $scope.buttonScheduleLighting = function() {
      $ionicPopup.alert({
       title: 'Coming Soon',
       template: 'Não há nada para ver aqui 💩'
     });
    }

    $scope.buttonScheduleFood = function() {
      $ionicPopup.alert({
       title: 'Coming Soon',
       template: 'Não há nada para ver aqui 💩'
     });
    }

    $scope.buttonAbout = function() {
      $ionicPopup.alert({
       title: 'Coming Soon',
       template: '💃'
     });
    }

    $scope.buttonExit = function() {
      $ionicPopup.alert({
       title: 'No!',
       template: '😠'
     });
    }
});
