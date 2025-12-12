## Topic 1.3: Real-Time Notification System

This folder demonstrates a real-time notification broadcasting system using Socket.IO.

### What it does:
- Serves an HTML page with a notification interface
- Allows users to send notifications that are broadcast to all connected clients
- Includes timestamps with each notification
- Tracks user connections and disconnections

### Features:
- Real-time notification broadcasting
- Timestamped notifications
- Connection management
- Web interface (index.html)

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` in multiple browser tabs to see notifications broadcast in real-time.