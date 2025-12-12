const express = require('express');
const http = require('http'); 
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); 
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let marketData = { 'DECI Tech': 175.00 };

function getRandomPrice(currentPrice) {
    const change = (Math.random() - 0.5) * 2;
    let newPrice = parseFloat(currentPrice) + change;
    if (newPrice < 10) newPrice = 10;
    return newPrice.toFixed(2);
}

const marketInterval = setInterval(() => {
    for (let key in marketData) {
        marketData[key] = getRandomPrice(marketData[key]);
    }

    io.emit('market_update', { 
        price: marketData['DECI Tech'], 
        timestamp: new Date().toLocaleTimeString('en-US') 
    });
}, 1000);


server.listen(3000, () => {
    console.log("running on http://localhost:3000");
});

