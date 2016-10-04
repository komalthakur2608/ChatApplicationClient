angular.module('chatApp', ['ngMaterial','ngMessages', 'ngRoute', 'btford.socket-io'])
.config(function($mdThemingProvider, $routeProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('pink');

   $routeProvider
   		.when('/', {
                templateUrl : 'views/loginRegister.html',
                controller  : 'LoginRegisterCtrl'
            })
      .when('/login', {
                templateUrl : 'views/login.html',
                controller  : 'LoginCtrl'
            })
      .when('/register', {
                templateUrl : 'views/register.html',
                controller  : 'RegisterCtrl'
            })
   		.when('/chat/:username', {
                templateUrl : 'views/main.html',
                controller  : 'MainCtrl'
            });
});