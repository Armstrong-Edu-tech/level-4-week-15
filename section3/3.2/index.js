const express = require("express");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const { initIO } = require("./utils/io.utils");
const { startMarketSimulation } = require("./services/market.service");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

initIO(server);

startMarketSimulation();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
});