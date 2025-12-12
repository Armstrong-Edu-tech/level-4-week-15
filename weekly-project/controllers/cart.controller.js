const productModel = require('../models/product.model');
const { sendCartAlert } = require('../utils/sendEmail.util');

let activeCarts = {};

const getProducts = async (req, res) => {
    res.json(productModel.getAll());
};

const updateCart = async (req, res) => {
    try {
        const { email, cart, socketId } = req.body;

        if (!socketId) return res.status(400).json({ error: "Socket ID required" });

        const itemIds = cart.map(item => item.id);

        activeCarts[socketId] = {
            email: email,
            cartItemIds: itemIds
        };

        res.status(200).json({ message: "Cart updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const placeOrder = async (req, res) => {
    try {
        const { cart, socketId } = req.body;

        let stockUpdated = false;
        let productsTriggeringAlert = [];
        let orderedItems = cart;

        orderedItems.forEach(orderItem => {
            const product = productModel.findById(orderItem.id);
            if (product && product.stock >= orderItem.quantity) {
                product.stock -= orderItem.quantity;
                stockUpdated = true;

                if (product.stock <= 3) {
                    productsTriggeringAlert.push(product);
                }
            }
        });

        if (stockUpdated) {
            req.io.emit('updateProducts', productModel.getAll());

            if (socketId) {
                req.io.to(socketId).emit('notification', {
                    type: 'success',
                    message: '🔔 API: New order placed!'
                });
            }

            if (productsTriggeringAlert.length > 0) {
                checkAndSendAlerts(req.io, socketId, productsTriggeringAlert);
            }

            return res.status(200).json({ success: true, message: "Order processed" });
        } else {
            return res.status(400).json({ success: false, message: "Stock insufficient" });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const checkAndSendAlerts = (io, buyerSocketId, alertProducts) => {
    let alertsMap = {};

    alertProducts.forEach(product => {
        for (const [socketId, userData] of Object.entries(activeCarts)) {

            if (socketId !== buyerSocketId && userData.email && userData.cartItemIds.includes(product.id)) {

                if (!alertsMap[userData.email]) {
                    alertsMap[userData.email] = {
                        socketId: socketId,
                        products: []
                    };
                }

                alertsMap[userData.email].products.push(product);
            }
        }
    });

    for (const [email, data] of Object.entries(alertsMap)) {

        sendCartAlert(email, data.products);

        const msg = data.products.length > 1
            ? `⚠️ Hurry! ${data.products.length} items in your cart are running out!`
            : `⚠️ Hurry! ${data.products[0].name} in your cart is running out!`;

        io.to(data.socketId).emit('notification', {
            type: 'error',
            message: msg
        });
    }
};

module.exports = { getProducts, updateCart, placeOrder };