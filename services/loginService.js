angular.module('chatApp')
.factory('LoginValidation', function($http) {
	return {

		login : function(user){
			return $http.post('/login', user);
		}
	}
});