angular.module('app.factories', [])
.factory('MobileFactory', function($http, $q){
    return {
        getTemperatureUbidots: function(){
            return $http({
                method: 'GET',
                url: 'http://things.ubidots.com/api/v1.6/variables/586ef0cb76254252a2f27c42/values/?page_size=1&token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0'
            });
        },
        getLightingUbidots: function() {
            return $http({
                method: 'GET',
                url: 'http://things.ubidots.com/api/v1.6/variables/5887d9ba76254260ef95aa3b/values/?page_size=1&token=FTfg995ftCnXZOfLqmFwJ83UN3v6w0'
            });
        }
    }
});
