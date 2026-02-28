const { Server } = require("socket.io");

let io;

const initIO = (server) => {
    io = new Server(server);

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initIO, getIO };