angular.module('dataGoMain')
    .controller('entitySubmissionController',function ($http, dataGoAPI, $scope) {
    var vm = this;
    $scope.entity = {
        name: "McDonalds",
        searchEnities : searchEntities,
    };
    var entityName = $scope.entity.name;  
    $scope.$watch('entityName', function() {
       dataGoAPI.apiReq('/entity/' + entityName, entityName, 'GET'); 
    });
    
    function searchEntities ( wikiApiUrl ) {
        var url = wikiApiUrl + encodeURI($scope.entityName);        
        var req = {
            method: 'GET',
            url: url
        };
        return $http(req);
    }
});