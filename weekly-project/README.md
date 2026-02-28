## Weekly Project – E-Commerce Cart System with Real-Time Updates

This folder contains the main weekly project: an Express-based cart system with Socket.IO updates and email alerts.

### What it does:
- Serves a Vue-based storefront from `public/index.html`
- Manages a product catalog with stock tracking
- Updates cart state per socket session
- Processes orders and broadcasts stock updates
- Sends email alerts when products in other users' carts run low

### Structure

- `controllers/` – Route handler logic (cart operations, order processing)
- `models/` – Product data model
- `routes/` – Route definitions for cart operations
- `utils/` – Email + Socket.IO utilities
- `public/` – Frontend HTML interface
- `server.js` – App entry point with Socket.IO integration

### Features:
- Real-time product updates via Socket.IO
- Shopping cart management by socket session
- Order processing with stock validation
- Low stock email alerts when stock is `<= 3`
- Socket notifications for success and alerts

### API Endpoints

- `GET /api/cart/products` - Get all products
- `POST /api/cart/update` - Update cart (requires `email`, `cart`, `socketId` in body)
- `POST /api/cart/order` - Place order (requires `cart`, `socketId` in body)

### Environment Variables

Create a `.env` file in this folder with the following variables:

```
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note**: For Gmail, you'll need to use an App Password, not your regular password.

### Getting Started

- **Install dependencies**:  
  `npm install`
- **Environment variables**:  
  Create a `.env` file with your email credentials (see above)
- **Run the server**:  
  `npm start`  
  or  
  `node server.js`

The server will run on `http://localhost:3000` (or the port specified in `.env`).

### How it works:
1. Users connect via Socket.IO and receive a session ID
2. Users can view products and update their cart
3. Cart updates are tracked per socket session
4. When an order is placed, stock is updated and all clients are notified
5. If any product in other users' carts drops to `<= 3` stock, they receive email alerts and Socket notifications