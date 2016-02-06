angular.module('dataGoMain')
    .controller('entitySubmissionController', function ($auth, $state, $http, $rootScope,$scope) {
    var vm = this;
    $scope.entityName = "McDonalds";
    var entityName = $scope.entityName;
    var wikiApiUrl = "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&titles=";
    $scope.searchEntities = searchEntities;
    console.log('inside entitySubmissionController');
    
    $scope.$watch('entityName', function() {
       searchEntities(wikiApiUrl); 
    });
    
    function searchEntities ( wikiApiUrl ) {
        var url = wikiApiUrl + $scope.entityName;        
        var req = {
            method: 'GET',
            url: url
        }
        return $http(req);
    }
});