## Topic 1.2: Simple Chat Application

This folder contains a basic real-time chat app using Socket.IO.

### What it does:
- Serves the UI from `public/index.html`
- Lets multiple clients send and receive chat messages
- Broadcasts each message to all connected clients
- Logs connect/disconnect events on the server

### Features:
- Socket.IO message broadcasting (`chat message`)
- Express static hosting for the UI
- Connection/disconnection logging

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) in multiple tabs to test the chat.