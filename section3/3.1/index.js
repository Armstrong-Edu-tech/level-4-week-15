const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const downloadRoutes = require("./routes/download.routes");

const app = express();

app.use(express.static("public"));

app.use("/", downloadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});