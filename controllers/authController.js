angular.module('dataGoMain')
    .controller('AuthController', function ($auth, $state, $http, $rootScope,$scope) {
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
});
    
