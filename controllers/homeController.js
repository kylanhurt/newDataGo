//currently empLog has no dependencies, it may also define the module that bootstraps the HTML page (ng-app)
angular.module("dataGoMain", ['ngRoute', 'ui.router', 'satellizer'])
        .controller('homeCtrl', HomeCtrl)
        .controller('mainCtrl', MainCtrl)
        .controller('AuthController', AuthController)
        .factory('api', api)
        .constant('apiUrl', 'http://newDataGo/api/')
        .config(function ($routeProvider, $stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {
            function redirectWhenLoggedOut($q, $injector) {

                return {
                    responseError: function (rejection) {

                        var $state = $injector.get('$state');

                        var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                        angular.forEach(rejectionReasons, function (value, key) {

                            if (rejection.data.error === value) {

                                localStorage.removeItem('user');

                                $rootScope.authenticated = false;
                            }
                        });

                        return $q.reject(rejection);
                    }
                }
            }
            // Setup for the $httpInterceptor
            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

            $authProvider.loginUrl = '/api/authenticate';

            $stateProvider
                .state('home', {
                    url: '',
                    views:{
                        'main-cont': {
                            templateUrl: 'views/home.html'
                        }
                    }

                });
        })
        .run(function ($rootScope, $state) {
            console.log(localStorage);
            if(localStorage.getItem('satellizer_token')) {
                $rootScope.authenticated = true;
                console.log('initial load, authenticated = true');
                $
            }

            $rootScope.$on('$stateChangeStart', function (event, toState) {

                var user = JSON.parse(localStorage.getItem('user'));

                if (user) {

                    $rootScope.authenticated = true;

                    $rootScope.currentUser = user;

                }
            })
        })


//scope acts as glue between view and model            
function HomeCtrl($scope, api) {
    console.log('in HomeCtrl');
    $scope.registerUser = registerUser;
    $scope.loginEmail = '';
    $scope.loginPassword = '';

    function registerUser() {
        var data = {email: $scope.loginEmail, password: $scope.loginPassword}
        console.log('HomeCtrl.registerUser')
        api.registerNewUser(data)
                .success(function (response) {
                    console.log('registerUser was successful.');
                })
    }
}

function MainCtrl($scope, $rootScope, $state, $auth ) {

}

function api($http, apiUrl) {
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
        }
    }
}

function AuthController($auth, $state, $http, $rootScope,$scope) {
    var vm = this;
    vm.loginError = false;
    vm.loginErrorText;  
    $rootScope.login = login;
    $rootScope.logout = logout;
    $scope.login = login;
    
    function login()  {
        var credentials = {
            email: $scope.email,
            password: $scope.password
        }

        $auth.login(credentials).then(function() {

            return $http.get('api/authenticate/user')
        .then(function(response) {

            var user = JSON.stringify(response.data.user);

            localStorage.setItem('user', user);

            $rootScope.authenticated = true;

            $rootScope.currentUser = response.data.user;

            });
        }, 
            // Handle errors
            function(error) {
            vm.loginError = true;
            vm.loginErrorText = error.data.error;
        });
    }


    function logout() {
        //$auth.logout() itself will remove satellizer_token from local storage.
        console.log('in logout function');
        $auth.logout().then(function() {

            localStorage.removeItem('user');

            $rootScope.authenticated = false;

            $rootScope.currentUser = null;

        });
    }     
}