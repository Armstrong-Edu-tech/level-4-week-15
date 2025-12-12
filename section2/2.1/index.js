const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/match-info', (req, res) => {
    res.json({
        team1: "Al Ahly SC",
        team2: "Zamalek SC",
        stadium: "Cairo Stadium",
        referee: "Ibrahim Nour El Din",
        tournament: "Egyptian Premier League"
    });
});

let score1 = 0;
let score2 = 0;
let minute = 1;

const matchSimulation = setInterval(() => {
    minute += 3;
    const randomEvent = Math.random();
    let eventText = "Cairo Derby in progress... 🔥";

    if (randomEvent > 0.92) {
        score1++;
        eventText = "GOAAAAL for Al Ahly! ⚽🦅";
    } else if (randomEvent < 0.08) {
        score2++;
        eventText = "GOAAAAL for Zamalek! ⚽🏹";
    }

    io.emit('match-update', {
        score1,
        score2,
        minute: minute > 90 ? '90+' : minute,
        event: eventText
    });

    if (minute >= 95) clearInterval(matchSimulation);
}, 2000);

io.on('connection', (socket) => {
    console.log("New client connected:", socket.id);
    
    socket.on('disconnect', () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


