## Topic 1.3: Real-Time Notification System

This folder demonstrates a real-time notification broadcaster using Socket.IO.

### What it does:
- Serves the UI from `public/index.html`
- Lets clients send notifications to the server
- Broadcasts notifications to other clients with timestamps
- Logs connect/disconnect events on the server

### Features:
- Socket.IO events (`send notification`, `receive notification`)
- Timestamped notifications
- Express static hosting for the UI

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) in multiple tabs to see notifications broadcast in real-time.