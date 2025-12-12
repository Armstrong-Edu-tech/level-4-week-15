## Topic 2.3: Real-Time Stock Management System

This folder contains a real-time product stock management system with live updates using Socket.IO.

### What it does:
- Displays a list of products with prices and stock levels
- Allows users to purchase products via API
- Updates stock levels in real-time across all connected clients
- Broadcasts stock updates when a purchase is made

### Features:
- Product catalog with stock tracking
- Purchase API endpoint (`POST /api/buy`)
- Real-time stock updates via Socket.IO
- Out-of-stock handling
- Web interface (index.html)

### API Endpoints:
- `GET /api/products` - Get all products
- `POST /api/buy` - Purchase a product (requires `{ id: productId }` in body)

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` in multiple browser tabs. When you purchase a product in one tab, all other tabs will see the stock update in real-time.