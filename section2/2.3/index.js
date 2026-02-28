const express = require("express");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const { initIO } = require("./utils/io.utils");
const productsRoutes = require("./routes/products.routes");

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.use("/api", productsRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

initIO(server);