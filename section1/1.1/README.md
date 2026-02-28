## Topic 1.1: Basic Socket.IO Server Setup

This folder demonstrates a minimal Socket.IO server attached to an Express app.

### What it does:
- Loads environment variables with `dotenv`
- Starts an Express server (default port `3000`)
- Initializes Socket.IO and logs new connections

### Features:
- Express server setup
- Socket.IO initialization via `utils/io.utils.js`
- Connection event logging

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

The server runs on `http://localhost:3000` (or `PORT` from `.env`) and logs connection events to the console.