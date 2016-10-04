angular.module('chatApp')
.controller('LoginCtrl', function($scope, LoginValidation, $location) {

	$scope.user = {
		name : '',
		password : ''
	}
	$scope.validate = function(){
		var res = LoginValidation.login($scope.user).success(function(data) {
			if(data == 'pass') {
				$location.path('/chat/' + $scope.user.name);
			}
			else{
				$scope.loginFail = "Invalid username or password";
			}
		});
	}	
});