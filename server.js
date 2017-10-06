var express = require("express");
var path = require("path");
var app = express();

var users = {};


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
  response.render('index');
})




var server = app.listen(8000, function() {
  console.log("listening on port 8000");
});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.on('name', function(data) {
    console.log(data.name);
    // console.log(socket.id);
    users[socket.id] = data.name;
    socket.broadcast.emit('new_user', {
      name: data.name
    })
    socket.emit('existing_users', {
      users: users
    });
  })

  // console.log("Client/socket id is: ", socket.id);

});
