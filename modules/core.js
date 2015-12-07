angular.module('core',[])
        .factory('currentSpot', currentSpot) //factory will invoke currentSpot object or method, enforces Singleton behavior
                                            //specifically provides the value that is returned by invokingthe function reference (currentSpot)
        .directive('empActiveMenu', empActiveMenu)
        .directive('empMenuId', empMenuId);

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
