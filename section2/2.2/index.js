const express = require("express");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const { initIO } = require("./utils/io.utils");
const todosRoutes = require("./routes/todos.routes");

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.use("/api/todos", todosRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

initIO(server);