## Topic 2.1: Live Sports Match Simulation

This folder contains a real-time sports match simulation that broadcasts live updates using Socket.IO.

### What it does:
- Simulates a live football match (Cairo Derby: Al Ahly SC vs Zamalek SC)
- Broadcasts match updates every 2 seconds including:
  - Current score
  - Match minute
  - Random events (goals)
- Provides a REST API endpoint to get match information

### Features:
- Real-time match simulation
- Random goal events
- Score tracking
- Match minute progression
- REST API for match info (`/api/match-info`)
- Web interface (index.html)

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` to watch the live match simulation. The match automatically ends after 95 minutes.