const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const { initIO } = require("./utils/io.utils");

const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

initIO(server);