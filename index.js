const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('send nickname', (nickname) => {
    io.emit('send nickname', nickname);
    console.log("We're in the nickname event emitter: ", nickname);
  });
});

server.listen(3000, () => {
  console.log('Server running...');
});
