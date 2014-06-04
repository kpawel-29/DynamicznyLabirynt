/*jshint node: true */
var less = require('less-middleware');
var socketio = require('socket.io');
var express = require('express');
var connect = require("connect");
var path = require('path');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var ioc = require('socket.io-client');
var csocket = ioc.connect('localhost', {
    port: 8080
});

csocket.on('connect', function () {
    console.log('połączenie nawiązane');
});


app.use(express.json());
app.use(express.urlencoded());
/*app.use(less({
    src: path.join(__dirname, 'less'),
    dest: path.join(__dirname, 'public/css'),
    prefix: '/css',
    compress: true
}));*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components/jquery/dist')));

app.get('/', function (req, res) {
    res.redirect('/index.html');
});
var player1 = false;
var player2 = false;
io.sockets.on('connection', function (socket) {
    console.log('połączenie przez Socket.io');
    
    socket.on('getPlayerList', function () {
    	if(player1){
       		socket.emit('playerLogIn', {html: '<p>Gracz 1 zalogowany</p>', id: 1} );
    	};
    	if(player2){
   			socket.emit('playerLogIn', {html: '<p>Gracz 2 zalogowany</p>', id: 2} );
    	};
    });
    socket.on('login', function (data) {
        console.log(data);
        if(data == "Gracz 1"){
        	player1 = true;
            socket.emit('playerLogIn', {html: '<p>Gracz 1 zalogowany</p>', id: 1} );
            socket.broadcast.emit('playerLogIn', {html: '<p>Gracz 1 zalogowany</p>', id: 1} );
        }
        if(data == "Gracz 2"){
        	player2 = true;
            socket.emit('playerLogIn', {html: '<p>Gracz 2 zalogowany</p>', id: 2} );
            socket.broadcast.emit('playerLogIn', {html: '<p>Gracz 2 zalogowany</p>', id: 2} );
        }
    });
    socket.on('askForStart', function() {
        if (player1 && player2) {
            var rand = Math.floor(Math.random() * 6);
            socket.emit('startGame', rand);
            socket.broadcast.emit('startGame', rand);
        };
    });
    socket.on('updateMyPosition', function(position) {
        socket.broadcast.emit('updatePosition', position);
    });

});

// Set server port
server.listen(8080);
console.log('server is running, port: 8080');
