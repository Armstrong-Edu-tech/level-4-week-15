const express = require("express");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const { initIO } = require("./utils/io.utils");

const app = express();

app.use(express.static("public"));

app.get("/api/match-info", (req, res) => {
    res.json({
        team1: "Al Ahly SC",
        team2: "Zamalek SC",
        stadium: "Cairo Stadium",
        referee: "Ibrahim Nour El Din",
        tournament: "Egyptian Premier League",
    });
});

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

initIO(server);