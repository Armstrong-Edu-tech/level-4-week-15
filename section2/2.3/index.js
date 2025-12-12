const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let products = [
    { id: 1, name: 'Gaming Mouse', price: 50, stock: 5 },
    { id: 2, name: 'Mechanical Keyboard', price: 120, stock: 3 },
    { id: 3, name: '4K Monitor', price: 300, stock: 0 } 
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/buy', (req, res) => {
    const { id } = req.body;
    const product = products.find(p => p.id === id);

    if (product && product.stock > 0) {
        product.stock--;

        res.json({ success: true, message: 'Purchase successful!' });

        io.emit('stock_update', { 
            id: product.id, 
            newStock: product.stock 
        });

    } else {
        res.status(400).json({ success: false, message: 'Out of stock!' });
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

