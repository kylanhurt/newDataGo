//currently empLog has no dependencies, it may also define the module that bootstraps the HTML page (ng-app)
angular.module("dataGoMain",['ngRoute','ui.router', 'satellizer'])
        .controller('homeCtrl',HomeCtrl)
        .controller('mainCtrl', MainCtrl)
        .factory('api',api)
        .constant('apiUrl', 'http://newDataGo/api/')
        .config(function($routeProvider, $stateProvider, $urlRouterProvider, $authProvider) {
           $routeProvider.when('/', {
               templateUrl: 'views/home.html'
           })
           $authProvider.loginUrl = '/api/authenticate';
            $urlRouterProvider.otherwise('/auth');
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'index.html',
                    controller: 'AuthController as auth'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'views/userView.html',
                    controller: 'UserController as user'
                });            
        });

//scope acts as glue between view and model            
function HomeCtrl ($scope, api) {
    console.log('in HomeCtrl');
    $scope.registerUser = registerUser;
    $scope.loginEmail = '';
    $scope.loginPassword = '';
    
    function registerUser() {
        var data = { email: $scope.loginEmail, password: $scope.loginPassword }
        console.log('HomeCtrl.registerUser')
        api.registerNewUser(data)
            .success(function(response) {
                console.log('registerUser was successful.');
            })
    }
    
    $scope.$watch('$viewContentLoaded', function(){
        console.log('inside getCSRF');
         api.getNewCSRF()
           .success(function(response){
               console.log('response is ' + response);
               $scope._token = response;
           });
    });     
}

function MainCtrl($scope) {
    
}

function api ($http, apiUrl) {
    return {
        registerNewUser: function (data) {
            var url = apiUrl + 'user/register';
            var postData = data;
            console.log('url', url);
            var req = {
                method: 'POST',
                url: url,
                data: postData
                
            }
            return $http(req);
        },
        getNewCSRF: function() {
            var url = apiUrl + 'csrf';
            console.log('url is: ' + url);
            var req = {
                method: 'GET',
                url: url
            }
            return $http(req);
        }
    }
}