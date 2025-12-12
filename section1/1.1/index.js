const express = require('express');
const { Server } = require("socket.io");

const app = express();

// Start the Express server on port 3000
// The callback runs once the server is successfully listening
const server = app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Initialize a new Socket.IO server and attach it to the existing HTTP server
const io = new Server(server);

// Listen for new client connections through Socket.IO
io.on('connection', (socket) => {
    console.log("A user connected");
});
