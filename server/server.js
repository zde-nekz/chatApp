const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

// config server to use with socketIO - this is why we add http at all
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', function(socket) {
  console.log('New user connected');

  socket.on('disconnect', function() {
    console.log('Client disconnected');
  });

  // create event
  socket.emit('newMessage', {
    from: 'zdenek@abc.com',
    text: 'WTF',
    createdAt:1234567890
  });

  socket.on('createMessage', (message) => {
    console.log('create message', message);
  });

});


app.use(express.static(publicPath));

// we use http as server instead of app
server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
