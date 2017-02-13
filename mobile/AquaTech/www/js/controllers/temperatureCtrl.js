angular.module('app.controllers')
.controller('temperatureCtrl', function($scope, $ionicLoading, $http){
    $ionicLoading.show({
        template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $scope.temperature = "";
    $scope.dataCreate = "";
    var requestVariable = {
        method: 'GET',
        url: 'http://things.ubidots.com/api/v1.6/variables/586ef0cb76254252a2f27c42/values/?page_size=1&token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0'
    }
    $http(requestVariable).then(function(data){
        $ionicLoading.hide();
        //console.log(data);
        $scope.temperature = data.data.results[0].value;

        //colocando a data de forma legivel
        var dataFormatada = new Date(data.data.results[0].created_at);
        var dataFormatadaString = dataFormatada.toString();
        var dividirData = dataFormatadaString.split(" ");
        $scope.dataCreate = dividirData[02] + "/" + dividirData[01] + "/" + dividirData[03] + " as " + dividirData[04];
    }, function(error){
        $ionicLoading.hide();
        console.log(error);
    })
});
