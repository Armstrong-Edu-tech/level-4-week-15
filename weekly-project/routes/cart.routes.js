const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/update', cartController.updateCart);

router.post('/order', cartController.placeOrder);

router.get('/products', cartController.getProducts);

module.exports = router;