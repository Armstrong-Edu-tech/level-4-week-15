const express = require("express");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const { initIO } = require("./utils/io.utils");

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

initIO(server);