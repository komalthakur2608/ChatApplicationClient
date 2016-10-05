angular.module('chatApp')
.controller('LoginCtrl', function($scope, LoginValidation, $location, $localStorage) {

	$scope.user = {
		name : '',
		password : ''
	}
	$scope.validate = function(){
		var res = LoginValidation.login($scope.user).success(function(data) {
			console.log("data : " + JSON.stringify(data));
			if(data.status == 'pass') {
				$localStorage.token = data.token;
				$location.path('/chat/' + $scope.user.name);	
			}
			else{
				$scope.loginFail = "Invalid username or password";
			}
		});
	}	
});