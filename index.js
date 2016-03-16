var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


var connectedUsers = 0;

io.on('connection', function(socket){
	console.log(socket.id);
	connectedUsers++;
	io.emit('chat connections',connectedUsers);
  	socket.on('chat message', function(user,msg){
   	io.emit('emit message', user,msg);
  	});
  	socket.on('typing event',function(data){
      console.log(data);
  		socket.broadcast.emit('typing event',data);
  	});
  	socket.on('disconnect',function(){
  		connectedUsers--;
  		io.emit('chat connections',connectedUsers);
  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
