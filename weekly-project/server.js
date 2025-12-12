const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const cartRoutes = require('./routes/cart.routes');

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/cart', cartRoutes);

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    socket.emit('sessionDetails', { socketId: socket.id });

    socket.on('disconnect', () => {
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});