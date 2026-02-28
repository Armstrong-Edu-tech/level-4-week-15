const { Server } = require("socket.io");

let io;

const initIO = (server) => {
    io = new Server(server);

    io.on("connection", (socket) => {
        console.log("A user connected! ID:", socket.id);

        socket.on("chat message", (msg) => {
            console.log("Message received from " + socket.id + ": " + msg);
            io.emit("chat message", msg);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
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