angular.module('app.controllers')
.controller('scheduleLightingCtrl', function($scope, $http, $ionicLoading){
    $ionicLoading.show({
        template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $scope.luminosidade = "";
    $scope.dataCreate = "";
    var requestVariable = {
        method: 'GET',
        url: 'http://things.ubidots.com/api/v1.6/variables/5887d9ba76254260ef95aa3b/values/?page_size=1&token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0',
    }
    $http(requestVariable).then(function(data){
        $ionicLoading.hide();
        console.log(data);
        console.log(data.data.results[0]);
        $scope.luminosidade = data.data.results[0].value;

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
