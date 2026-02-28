## Topic 2.3: Real-Time Stock Management System

This folder contains a real-time product stock manager with live updates using Socket.IO.

### What it does:
- Displays products with prices and stock levels
- Allows users to purchase products via API
- Broadcasts stock updates to all connected clients
- Serves the UI from `public/index.html`

### Features:
- Product catalog with stock tracking
- Purchase API endpoint (`POST /api/buy`)
- Real-time stock updates (`stock_update`)
- Out-of-stock handling

### API Endpoints:
- `GET /api/products` - Get all products
- `POST /api/buy` - Purchase a product (requires `{ id }` in body)

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) in multiple tabs. When you purchase a product in one tab, all other tabs will see the stock update in real-time.