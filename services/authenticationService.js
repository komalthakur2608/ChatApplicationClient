angular.module('chatApp')
.factory('Authentication',function($http, $localStorage){
 return{
   auth : function(){
   	var req = {
	 method: 'GET',
	 url: '/auth',
	 headers: {
	   'Authorization': $localStorage.token
	 }
	}

	return $http(req);

   }
 }
});
