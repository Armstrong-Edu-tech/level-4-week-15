const { Server } = require("socket.io");

let io;

const initIO = (server) => {
    io = new Server(server);

    io.on("connection", (socket) => {

        socket.on("new user", (username) => {
            socket.username = username;

            socket.broadcast.emit(
                "system notification",
                `${username} has joined the chat`
            );
        });

        socket.on("chat message", (msg) => {
            io.emit("chat message", {
                user: socket.username,
                text: msg,
            });
        });

        socket.on("disconnect", () => {
            if (socket.username) {
                io.emit(
                    "system notification",
                    `${socket.username} has left the chat`
                );
            }
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