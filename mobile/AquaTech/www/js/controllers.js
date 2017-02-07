angular.module('app.controllers', [])

.controller('dashboardCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('temperatureCtrl', ['$scope', '$stateParams', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
  $scope.temperature = "";
  $scope.dataCreate = "";
  /* Assim buga tudo */
  // var requestAllVariable = {
  //    method: 'GET',
  //    url: 'http://things.ubidots.com/api/v1.6/devices/AquaTest/Temperatura/values?token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0?page_size=1',
  //  }
   var requestVariable = {
      method: 'GET',
      url: 'http://things.ubidots.com/api/v1.6/variables/586ef0cb76254252a2f27c42/values/?page_size=1&token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0'
    }
  $http(requestVariable).then(function(data){
    console.log(data);
    console.log(data.data.results[0]);
    $scope.temperature = data.data.results[0].value;
    $scope.dataCreate = data.data.results[0].created_at;
  }, function(error){
    console.log(error);
  })
}])

.controller('waterLevelCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('scheduleLightingCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
  $scope.luminosidade = "";
  $scope.dataCreate = "";
  /* Assim buga tudo */
  // var requestAllVariable = {
  //    method: 'GET',
  //    url: 'http://things.ubidots.com/api/v1.6/devices/AquaTest/Temperatura/values?token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0?page_size=1',
  //  }
   var requestVariable = {
      method: 'GET',
      url: 'http://things.ubidots.com/api/v1.6/variables/5887d9ba76254260ef95aa3b/values/?page_size=1&token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0',
    }
  $http(requestVariable).then(function(data){
    console.log(data);
    console.log(data.data.results[0]);
    $scope.luminosidade = data.data.results[0].value;
    $scope.dataCreate = data.data.results[0].created_at;
  }, function(error){
    console.log(error);
  })

}])

.controller('scheduleFoodCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
