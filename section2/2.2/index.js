const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let todos = [
    { id: 1, text: 'DECI - First Task', completed: true },
    { id: 2, text: 'DECI - Second Task', completed: false }
];


app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };

    todos.push(newTodo);

    io.emit('sync:add', newTodo);
    
    res.json({ success: true });
});

app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;

        io.emit('sync:update', todo);
        
        res.json({ success: true });
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    todos = todos.filter(t => t.id !== id);

    io.emit('sync:delete', id);

    res.json({ success: true });
});


io.on('connection', (socket) => {
    console.log('Client connected for sync:', socket.id);
});

server.listen(3000, () => {
    console.log('Sync Server running on http://localhost:3000');
});

