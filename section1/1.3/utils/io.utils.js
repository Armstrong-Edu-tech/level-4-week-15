const { Server } = require("socket.io");

let io;

const initIO = (server) => {
    io = new Server(server);

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("send notification", (msg) => {
            console.log("Broadcasting update:", msg);

            socket.broadcast.emit("receive notification", {
                message: msg,
                timestamp: new Date().toLocaleTimeString(),
            });
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