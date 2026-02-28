## Topic 1.4: Chat Application with Usernames

This folder contains a chat app with usernames and join/leave notifications.

### What it does:
- Serves the UI from `public/index.html`
- Lets users set a username when joining
- Broadcasts chat messages with usernames
- Emits system notifications when users join or leave

### Features:
- Socket.IO events (`new user`, `chat message`, `system notification`)
- Username tracking per socket
- Express static hosting for the UI

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) in multiple tabs, set different usernames, and see join/leave notifications and chat messages.