angular.module('main', ['ngRoute', 'core', 'maintenance'])
    .controller('adminCtrl', AdminCtrl)
    .controller('mainCtrl', MainCtrl)
    .config(function($routeProvider) {
        //I believe the views here will automatically be inserted into the ng-view element
        $routeProvider.when('/locations', {
            templateUrl: 'views/locations.html',
            controller: 'locationsCtrl' //views are set to different controllers!
        });
        $routeProvider.when('/empLocs', {
            templateUrl: 'views/empLocs.html',
            controller: 'empLocsCtrl'
        });
        $routeProvider.when('/types', {
            templateUrl: 'views/types.html',
            controller: 'typesCtrl'
        });
        $routeProvider.otherwise({
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
        });
    });
        
        
function AdminCtrl($scope, currentSpot) {
    $scope.isActive = isActive;
    $scope.getTitle = getTitle;
    
    function isActive(menuId) {
        return currentSpot.getActiveMenu() == menuId;
    }
    
    function getTitle() {
        return currentSpot.getTitle();
    }
}



function MainCtrl() {

}