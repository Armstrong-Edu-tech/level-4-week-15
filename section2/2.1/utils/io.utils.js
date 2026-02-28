const { Server } = require("socket.io");

let io;

let score1 = 0;
let score2 = 0;
let minute = 1;

const initIO = (server) => {
    io = new Server(server);

    const matchSimulation = setInterval(() => {
        minute += 3;

        const randomEvent = Math.random();
        let eventText = "Cairo Derby in progress...";

        if (randomEvent > 0.92) {
            score1++;
            eventText = "GOAAAAL for Al Ahly!";
        } else if (randomEvent < 0.08) {
            score2++;
            eventText = "GOAAAAL for Zamalek!";
        }

        io.emit("match-update", {
            score1,
            score2,
            minute: minute > 90 ? "90+" : minute,
            event: eventText,
        });

        if (minute >= 95) clearInterval(matchSimulation);
    }, 2000);

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
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