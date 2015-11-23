angular.module('maintenance', ['ngRoute'])
    .controller('adminCtrl', AdminCtrl)
    .controller('mainCtrl',MainCtrl)
    .controller('locationsCtrl', LocationsCtrl)
    .controller('empLocsCtrl', EmpLocsCtrl)
    .controller('typesCtrl', TypesCtrl)
    .factory('currentSpot', currentSpot) //registers a service function, and expects a returned object that defines properties and operations of the service
    .directive('empActiveMenu', empActiveMenu)
    .directive('empMenuId', empMenuId)
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

function empActiveMenu(currentSpot) {
    return function(scope, element, attrs) {
        var activeMenuId = attrs['empActiveMenu'];
        var activeTitle = attrs['empActiveTitle'];
        currentSpot.setCurrentSpot(activeMenuId, activeTitle);
    };
}

function empMenuId(currentSpot) {
    var menuElements = [];
    function setActive(element, menuId) {
        if(currentSpot.getActiveMenu() == menuId) {
            element.addClass('active');
        } else {
            element.removeClass('active');
        }
    }
    return function(scope, element, attrs) {
        var menuId = attrs['empMenuId'];
        menuElements.push = ({id: menuId, node:element});
        
        var watcherFn = function(watchScope) {
            return watchScope.$eval('getActiveMenu()');
        }
        
        scope.$watch(watcherFn, function(newValue, oldValue) { //registers a listener (2nd parameter) callback to be executed whenever parameter 1 changes
            for (var i= 0; i < menuElements.length; i++) {
                var menuElement = menuElements[i];
                setActive(menuElement.node, menuElement.id);
            }
        });
        
        setActive(element, menuId);
    }
}

function currentSpot() { //since it's a factory service it can act like both a function and object?
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



function MainCtrl() {
    //currentSpot.setCurrentSpot('','');
}

function LocationsCtrl() {
    //currentSpot.setCurrentSpot('Locations', 'Manage the list of employer locations');
}

function EmpLocsCtrl() {
    //currentSpot.setCurrentSpot('Employers', 'Manage the list of employers');
}

function TypesCtrl() {
    
}