angular.module('chatApp')
.controller('RegisterCtrl', function($scope, RegisterValidation, $location) {

	$scope.user = {
		name : '',
		password : ''
	}
	$scope.validate = function(){
		var res = RegisterValidation.register($scope.user).success(function(data) {
			if(data == 'pass') {
				$location.path('/login');
			}
			else{
				$scope.registerFail = "Username already exists!!!!";
			}
		});
	}	
});