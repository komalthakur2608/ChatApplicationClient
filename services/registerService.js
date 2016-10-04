angular.module('chatApp')
.factory('RegisterValidation', function($http) {
	return {

		register : function(user){
			return $http.post('/register', user);
		}
	}

});