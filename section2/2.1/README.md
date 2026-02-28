## Topic 2.1: Live Sports Match Simulation

This folder contains a real-time sports match simulator that streams updates via Socket.IO.

### What it does:
- Simulates a football match (Al Ahly SC vs Zamalek SC)
- Emits match updates every 2 seconds (score, minute, event)
- Exposes match metadata via `GET /api/match-info`
- Serves the UI from `public/index.html`

### Features:
- Real-time match simulation
- Random goal events
- REST API for match info
- Express static hosting for the UI

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) to watch the live match simulation. The match ends after 95 minutes.