const express = require("express");
const router = express.Router();
const fs = require("fs");

let currentFileName = "";

router.post("/upload", (req, res) => {
    const originalName = req.headers["x-file-name"] || "file.bin";

    const parts = originalName.split(".");
    const ext = parts.length > 1 ? "." + parts.pop() : "";

    currentFileName = "uploaded-" + Date.now() + ext;

    const writeStream = fs.createWriteStream(currentFileName);

    req.on("data", (chunk) => {
        writeStream.write(chunk);
    });

    req.on("end", () => {
        writeStream.end();
        res.send(currentFileName);
    });
});

router.get("/download", (req, res) => {
    if (!currentFileName || !fs.existsSync(currentFileName)) {
        return res.status(404).send("Upload a file first!");
    }

    const stat = fs.statSync(currentFileName);
    const fileSize = stat.size;
    const range = req.headers.range;

    const CHUNK_SIZE = 64 * 1024;

    let start = 0;
    let end = fileSize - 1;
    let statusCode = 200;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        start = parseInt(parts[0], 10);
        end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        statusCode = 206;
    }

    const chunkLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkLength,
        "Content-Type": "text/plain",
    };

    res.writeHead(statusCode, headers);

    const fileStream = fs.createReadStream(currentFileName, {
        start,
        end,
        highWaterMark: CHUNK_SIZE,
    });

    fileStream.on("data", (chunk) => res.write(chunk));
    fileStream.on("end", () => res.end());
});

module.exports = router;