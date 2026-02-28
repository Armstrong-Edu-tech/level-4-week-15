## Topic 3.2: Real-Time Stock Market Price Updates

This folder contains a real-time stock market price simulator that broadcasts live price updates using Socket.IO.

### What it does:
- Simulates stock price changes for "DECI Tech"
- Updates prices every second with random fluctuations
- Broadcasts price updates to all connected clients in real-time
- Includes timestamps with each update

### Features:
- Real-time price simulation
- Price updates every 1 second
- Timestamped updates
- Web interface served from `public/index.html`

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) to see live stock price updates. Open multiple tabs to see synchronized updates across all clients.