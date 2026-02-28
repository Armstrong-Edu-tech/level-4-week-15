const { getIO } = require("../utils/io.utils");

let marketData = { "DECI Tech": 175.0 };

function getRandomPrice(currentPrice) {
    const change = (Math.random() - 0.5) * 2;
    let newPrice = parseFloat(currentPrice) + change;
    return newPrice.toFixed(2);
}

const startMarketSimulation = () => {
    setInterval(() => {
        for (let key in marketData) {
            marketData[key] = getRandomPrice(marketData[key]);
        }

        getIO().emit("market_update", {
            price: marketData["DECI Tech"],
            timestamp: new Date().toLocaleTimeString("en-US"),
        });
    }, 1000);
};

module.exports = { startMarketSimulation };