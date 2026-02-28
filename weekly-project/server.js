const express = require("express");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const { initIO } = require("./utils/io.utils");
const cartRoutes = require("./routes/cart.routes");

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.use(express.json());

initIO(server);

app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});