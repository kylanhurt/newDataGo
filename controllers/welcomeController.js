angular.module('dataGoMain')
    .controller('WelcomeController', ['$scope', '$http', 'dataGoAPI', '$rootScope',function($scope, $http, dataGoAPI, $rootScope){
        console.log('in HomeCtrl');
        $scope.registerUser = registerUser;
        $scope.loginEmail = '';
        $scope.loginPassword = '';
        $scope.registrationError = {"username" : false};

        function registerUser() {
            var data = {email: $scope.loginEmail, password: $scope.loginPassword}
            dataGoAPI.registerNewUser(data)
                .success(function (response) {
                    if(response.code === 1) {
                        $scope.email = $scope.loginEmail;
                        $scope.password = $scope.loginPassword;
                        $rootScope.login();
                    } else if(response.code === 0) {
                        $scope.registrationError.username = response.message;
                    }
                })
                .error (function(response) {
                    console.log(response)
                })
        }       
    }]);            


