angular.module('dataGoMain')
    .controller('entitySubmissionController',['dataGoAPI', function ($auth, $state, $http, $rootScope,$scope, wikiService, dataGoAPI) {
    var vm = this;
    $scope.entityName = "McDonalds";
    var entityName = $scope.entityName;
    $scope.searchEntities = searchEntities;    
    $scope.$watch('entityName', function() {
       dataGoAPI.apiReq('/entity/', entityName, 'GET'); 
    });
    
    function searchEntities ( wikiApiUrl ) {
        var url = wikiApiUrl + $scope.entityName;        
        var req = {
            method: 'GET',
            url: url
        };
        return $http(req);
    }
}]);