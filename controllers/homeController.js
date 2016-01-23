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

                        // Need to use $injector.get to bring in $state or else we get
                        // a circular dependency error
                        var $state = $injector.get('$state');

                        // Instead of checking for a status code of 400 which might be used
                        // for other reasons in Laravel, we check for the specific rejection
                        // reasons to tell us if we need to redirect to the login state
                        var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                        // Loop through each rejection reason and redirect to the login
                        // state if one is encountered
                        angular.forEach(rejectionReasons, function (value, key) {

                            if (rejection.data.error === value) {

                                // If we get a rejection corresponding to one of the reasons
                                // in our array, we know we need to authenticate the user so 
                                // we can remove the current user from local storage
                                localStorage.removeItem('user');

                                // Send the user to the auth state so they can login
                                //$state.go('auth');
                                $rootScope.authenticated = false;
                            }
                        });

                        return $q.reject(rejection);
                    }
                }
            }
            // Setup for the $httpInterceptor
            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

            // Push the new factory onto the $http interceptor array
            //$httpProvider.interceptors.push('redirectWhenLoggedOut');

            $authProvider.loginUrl = '/api/authenticate';


            $stateProvider
                .state('home', {
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
            // $stateChangeStart is fired whenever the state changes. We can use some parameters
            // such as toState to hook into details about the state as it is changing
            $rootScope.$on('$stateChangeStart', function (event, toState) {

                // Grab the user from local storage and parse it to an object
                var user = JSON.parse(localStorage.getItem('user'));

                // If there is any user data in local storage then the user is quite
                // likely authenticated. If their token is expired, or if they are
                // otherwise not actually authenticated, they will be redirected to
                // the auth state because of the rejected request anyway
                if (user) {

                    // The user's authenticated state gets flipped to
                    // true so we can now show parts of the UI that rely
                    // on the user being logged in
                    $rootScope.authenticated = true;

                    // Putting the user's data on $rootScope allows
                    // us to access it anywhere across the app. Here
                    // we are grabbing what is in local storage
                    $rootScope.currentUser = user;

                    // If the user is logged in and we hit the auth route we don't need
                    // to stay there and can send the user to the main state
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

function AuthController($auth, $state, $http, $rootScope) {
    console.log('in Auth(User)Controller');
    var vm = this;

    vm.loginError = false;
    vm.loginErrorText;
    vm.users;
    vm.error;    
    $rootScope.login = login;
    $rootScope.logout = logout;
    
    function login()  {
        console.log('in auth login');
        var credentials = {
            email: vm.email,
            password: vm.password
        }

        // Use Satellizer's $auth service to login
        $auth.login(credentials).then(function() {

            // Return an $http request for the now authenticated
            // user so that we can flatten the promise chain
            return $http.get('api/authenticate/user')
        .then(function(response) {

            // Stringify the returned data to prepare it
            // to go into local storage
            var user = JSON.stringify(response.data.user);

            // Set the stringified user data into local storage
            localStorage.setItem('user', user);

            // The user's authenticated state gets flipped to
            // true so we can now show parts of the UI that rely
            // on the user being logged in
            $rootScope.authenticated = true;

            // Putting the user's data on $rootScope allows
            // us to access it anywhere across the app
            $rootScope.currentUser = response.data.user;

            // Everything worked out so we can now redirect to
            // the users state to view the data
            //$state.go('users');
            });
        }, 
            // Handle errors
            function(error) {
            vm.loginError = true;
            vm.loginErrorText = error.data.error;
        });
    }
    


    vm.getUsers = function () {

        // This request will hit the index method in the AuthenticateController
        // on the Laravel side and will return the list of users
        $http.get('api/authenticate').success(function (users) {
            vm.users = users;
        }).error(function (error) {
            vm.error = error;
        });
    }

    // We would normally put the logout method in the same
    // spot as the login method, ideally extracted out into
    // a service. For this simpler example we'll leave it here
    function logout() {
        //$auth.logout() itself will remove satellizer_token from local storage.
        console.log('in logout function');
        $auth.logout().then(function() {

            // Remove the authenticated user from local storage
            localStorage.removeItem('user');

            // Flip authenticated to false so that we no longer
            // show UI elements dependant on the user being logged in
            $rootScope.authenticated = false;

            // Remove the current user info from rootscope
            $rootScope.currentUser = null;
            // Redirect to auth (necessary for Satellizer 0.12.5+)
            //$state.go('auth');
        });
    }     
}