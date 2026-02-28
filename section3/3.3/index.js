const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const fileRoutes = require("./routes/file.routes");

const app = express();

app.use(express.static("public"));

app.use("/", fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
});