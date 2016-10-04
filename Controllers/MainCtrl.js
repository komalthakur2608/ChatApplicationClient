angular.module('chatApp')
.controller('MainCtrl', function($scope, $routeParams, MySocket) {
	$scope.welcomeMsg = '';
	var username = $routeParams.username;
	var socket = MySocket.getSocket();
	socket.emit('join', $routeParams.username);

	socket.on('welcome', function(msg){
		$scope.welcomeMsg = msg;
	})

	$scope.available_people = [];
	$scope.sentRequestPeople = [];
	$scope.requestReceivedPeople = [];
	$scope.chats = {};

	socket.on('available_people', function(people){
		$scope.available_people = [];
        angular.forEach(people, function(name, id){
            if(username != name){
               $scope.available_people.push({id : id, name : name})
            }
        })
        console.log($scope.available_people);
    });

    $scope.sendRequest = function(id, name){
    	console.log(id+name);
    	$scope.sentRequestPeople.push({id : id, name : name});
    	socket.emit('send_request', id);
    }

    socket.on('client1_request', function(name, id){
    	$scope.requestReceivedPeople.push({id : id, name : name});
    });


    $scope.sendAcceptance = function(id) {
    	var temp = $scope.requestReceivedPeople;
      	$scope.requestReceivedPeople = [];
      	angular.forEach(temp, function(person) {
        	if (person.id !=id) $scope.requestReceivedPeople.push(person);
      	});
    	socket.emit('request_accepted', id);

    }

    socket.on('start-chat', function(id1, id2, historys){

    }

	
});