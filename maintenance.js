angular.module('maintenance', ['ngRoute'])
        .controller('adminCtrl', AdminCtrl)
        .controller('mainCtrl',MainCtrl)
        .controller('locationsCtrl', LocationsCtrl)
        .controller('empLocsCtrl', EmpLocsCtrl)
        .factory('currentSpot', currentSpot) //registers a service function, and expects a returned object that defines properties and operations of the service
        .config(function($routeProvider) {
            //I believe the views here will automatically be inserted into the ng-view element
            $routeProvider.when('/locations', {
                templateUrl: 'views/locations.html',
                controller: 'locationsCtrl'
            });
            $routeProvider.when('/empLocs', {
                templateUrl: 'views/empLocs.html',
                controller: 'empLocsCtrl'
            });
            $routeProvider.otherwise({
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            });
        });

function currentSpot() {
    var activeMenuId = '';
    var titleText = '';
    
    return {
        setCurrentSpot: function(menuId, title) {
            activeMenuId = menuId;
            titleText = title;
        },
        getActiveMenu: function() {
            return activeMenuId;
        },
        getTitle: function() {
            return titleText;
        }
    }
}

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



function MainCtrl(currentSpot) {
    currentSpot.setCurrentSpot('','');
}

function LocationsCtrl(currentSpot) {
    currentSpot.setCurrentSpot('Locations', 'Manage the list of employer locations');
}

function EmpLocsCtrl(currentSpot) {
    currentSpot.setCurrentSpot('Employers', 'Manage the list of employers');
}