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

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});


app.use(express.static(publicPath));

// we use http as server instead of app
server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
