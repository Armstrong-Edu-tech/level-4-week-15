## Topic 2.2: Real-Time Todo List Synchronization

This folder contains a todo list application with real-time synchronization across multiple clients using Socket.IO.

### What it does:
- Manages a todo list with CRUD operations (Create, Read, Update, Delete)
- Synchronizes todos across all connected clients in real-time
- When one client adds, updates, or deletes a todo, all other clients are notified instantly
- Uses REST API endpoints for operations and Socket.IO for broadcasting changes

### Features:
- RESTful API for todo operations:
  - `GET /api/todos` - Get all todos
  - `POST /api/todos` - Add a new todo
  - `PUT /api/todos/:id` - Toggle todo completion
  - `DELETE /api/todos/:id` - Delete a todo
- Socket.IO events for sync (`sync:add`, `sync:update`, `sync:delete`)
- Web interface served from `public/index.html`

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) in multiple tabs to see todos sync in real-time across all clients.