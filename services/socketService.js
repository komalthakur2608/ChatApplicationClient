angular.module('chatApp').
factory('MySocket', function (socketFactory) {
  var myIoSocket = io.connect('localhost:3001');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return {
  	getSocket : function(){
  		return mySocket;
  	}
  }
});