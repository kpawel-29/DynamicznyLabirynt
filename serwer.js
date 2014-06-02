// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var socketio = require('socket.io');
var io = socketio.listen(server);
var ioc = require('socket.io-client');
var csocket = ioc.connect('localhost', {
    port: 4000
});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components/jquery/dist')));

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

// Set server port
app.listen(8080);
console.log('server is running, port: 8080');

/*server.listen(4000, function () {
    console.log('Serwer działa na porcie 4000');
});*/