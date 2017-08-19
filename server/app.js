/**
 * Aplicación que levanta un servidor Nodejs
 */
var http = require('http'),
fs = require('fs'),
index = fs.readFileSync(__dirname + '/index.html');

//Se establece el index.html como respuesta para cualquier llamado http
//dicho archivo no contiene nada
var app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
});

// Registramos el servidor socketio en la aplicación
var io = require('socket.io').listen(app);
// Establecemos los listeners para los llamados del comander y los respectivos broadcast a los esclavos
io.on('connection', function(socket) {
  socket.on('function_call_commander', function(data){
    socket.broadcast.emit('function_call', data);
  });
  socket.on('change_url_commander', function(data){
    socket.broadcast.emit('change_url', data);
  });
});
// Iniciamos la aplicación
app.listen(3000);
