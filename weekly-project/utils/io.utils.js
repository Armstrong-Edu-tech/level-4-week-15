const { Server } = require("socket.io");

let io;

const initIO = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log("User Connected:", socket.id);

        socket.emit("sessionDetails", { socketId: socket.id });

        socket.on('disconnect', () => {
            console.log("User Disconnected:", socket.id);
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initIO, getIO };