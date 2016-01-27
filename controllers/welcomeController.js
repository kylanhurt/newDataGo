angular.module('dataGoMain')
    .controller('WelcomeController', ['$scope', '$http', 'dataGoAPI',function($scope, $http, dataGoAPI){
        console.log('in HomeCtrl');
        $scope.registerUser = registerUser;
        $scope.loginEmail = '';
        $scope.loginPassword = '';

            function registerUser() {
                var data = {email: $scope.loginEmail, password: $scope.loginPassword}
                console.log('HomeCtrl.registerUser')
                dataGoAPI.registerNewUser(data)
                        .success(function (response) {
                            console.log('registerUser was successful.');
                        })
            }       
    }]);            


