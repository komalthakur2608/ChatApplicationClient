angular.module('chatApp')
.controller('MainCtrl', function($scope, $routeParams, MySocket, $location, Authentication) {

	var username = null;
	var socket = null;
	$scope.available_people = [];
	$scope.sentRequestPeople = [];
	$scope.requestReceivedPeople = [];
	$scope.chats = [];
	$scope.message = "";
	Authentication.auth().success(function(data){
		console.log("success data : " + data)
			$scope.welcomeMsg = '';
			username = $routeParams.username;
			socket = MySocket.getSocket();
			socket.emit('join', $routeParams.username);

			socket.on('welcome', function(msg){
				$scope.welcomeMsg = msg;
			})

			socket.on('available_people', function(people){
				$scope.available_people = [];
		        angular.forEach(people, function(name, id){
		            if(username != name){
		               $scope.available_people.push({id : id, name : name})
		            }
		        })
	        	console.log($scope.available_people);
	   	 	});

	   	 	socket.on('client1_request', function(name, id){
		    	$scope.requestReceivedPeople.push({id : id, name : name});
		    });

		    socket.on('accept_handshake', function (id){
		    	console.log('accept_handshake : ' + id);
		    	var temp = $scope.sentRequestPeople;
		      	$scope.sentRequestPeople = [];
		      	angular.forEach(temp, function(person) {
		        	if (person.name != id) $scope.sentRequestPeople.push(person);
		      	});
			})

		    socket.on('start-chat', function(id1, id2, historys){
		    	var history = [];
		    	angular.forEach(historys, function(element){
		    		history.push({sender : element.sender, message : element.message})
		    	})
		    	console.log(JSON.stringify(history));
		    	$scope.chats.push({'id1' : id1, 'id2' : id2, 'history' : history })
		    	console.log(JSON.stringify($scope.chats));
		    });

		    socket.on('chat', function(msg, ids, sender) {
		    	var clients = ids.split('-');
		    	angular.forEach($scope.chats, function(element){
		    		if((element.id1==clients[0] || element.id2==clients[0]) && (element.id1==clients[1] || element.id2==clients[1])){
		    			element.history.push({sender : sender, message : msg})
		    		}
		    	})
		    });

		    socket.on('disconnected', function(name, id){
		    	console.log("iddddddddddddddd : " + id)
		        var temp = $scope.available_people;
		      	$scope.available_people = [];
		      	console.log("temp available : " + JSON.stringify(temp));
		      	angular.forEach(temp, function(person) {
		        	if (person.id !=id) {
		        		$scope.available_people.push(person);
		        	}
		      	});


		      	temp = $scope.chats;
		      	$scope.chats=[];
		      	angular.forEach(temp, function(element){
		    		if(element.id1!=name && element.id2!=name){
		    			$scope.chats.push(element);
		    		}
		    	})
		    	console.log("temp chats : " + JSON.stringify(temp));
		    })
		}).error(function(data) {
			$location.path('/login');
	});
	
	

    $scope.sendRequest = function(id, name){
    	console.log(id+name);
    	$scope.sentRequestPeople.push({id : id, name : name});
    	socket.emit('send_request', id);
    }

    $scope.sendAcceptance = function(id) {
    	var temp = $scope.requestReceivedPeople;
      	$scope.requestReceivedPeople = [];
      	angular.forEach(temp, function(person) {
        	if (person.id !=id) $scope.requestReceivedPeople.push(person);
      	});
    	socket.emit('request_accepted', id);

    }

    $scope.sendMessage = function(id1, id2, msg) {
    	console.log("message : " + msg);
    	$scope.message = "";
    	socket.emit('send', id1+'-'+id2, msg);
    }
	
});