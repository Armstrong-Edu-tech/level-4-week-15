const express = require("express");
const router = express.Router();
const { getIO } = require("../utils/io.utils");

let products = [
    { id: 1, name: "Gaming Mouse", price: 50, stock: 5 },
    { id: 2, name: "Mechanical Keyboard", price: 120, stock: 3 },
    { id: 3, name: "4K Monitor", price: 300, stock: 0 },
];

router.get("/products", (req, res) => {
    res.json(products);
});

router.post("/buy", (req, res) => {
    const { id } = req.body;

    const product = products.find((p) => p.id === Number(id));

    if (product && product.stock > 0) {
        product.stock--;

        getIO().emit("stock_update", {
            id: product.id,
            newStock: product.stock,
        });

        return res.json({ success: true, message: "Purchase successful!" });
    }

    return res.status(400).json({ success: false, message: "Out of stock!" });
});

module.exports = router;