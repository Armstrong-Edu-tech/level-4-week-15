const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('new user', (username) => {
        socket.username = username;

        socket.broadcast.emit('system notification', `🔵 ${username} has joined the chat`);
    });

    socket.on('chat message', (msg) => {

        io.emit('chat message', {
            user: socket.username,
            text: msg
        });
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('system notification', `🔴 ${socket.username} has left the chat`);
        }
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


