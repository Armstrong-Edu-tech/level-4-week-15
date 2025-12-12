const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let currentFilePath = '';
const CHUNK_SIZE = 64 * 1024;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
    const originalName = req.headers['x-file-name'] || 'unknown.bin';
    const ext = path.extname(originalName);
    const fileName = 'upload-' + Date.now() + ext;

    currentFilePath = path.join(__dirname, fileName);

    const writeStream = fs.createWriteStream(currentFilePath, {
        highWaterMark: CHUNK_SIZE
    });

    req.on('data', (chunk) => {
        const canWrite = writeStream.write(chunk);
        if (!canWrite) {
            req.pause()
        }
    });

    writeStream.on('drain', () => {
        req.resume();
    });

    req.on('end', () => {
        writeStream.end();
        console.log("Upload Complete");
        res.send(fileName);
    });

    req.on('error', (err) => {
        console.error('Upload Error:', err);
        res.status(500).send("Upload failed");
    });
});


app.get('/download', (req, res) => {
    if (!currentFilePath || !fs.existsSync(currentFilePath)) {
        return res.status(404).send("Upload a file first!");
    }

    const size = fs.statSync(currentFilePath).size;
    const fileName = path.basename(currentFilePath);
    const range = req.headers.range;

    const headers = {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Accept-Ranges': 'bytes'
    };

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : size - 1;

        headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
        headers['Content-Length'] = (end - start) + 1;
        res.writeHead(206, headers);

        const stream = fs.createReadStream(currentFilePath, { start, end, highWaterMark: CHUNK_SIZE});

        stream.on('data', (chunk) => {
            res.write(chunk);
        });

        stream.on('end', () => {
            res.end();
        });

        stream.on('error', (err) => {
            console.error(err);
            res.end();
        });
    }
    else {
        headers['Content-Length'] = size;
        res.writeHead(200, headers);
        const readStream = fs.createReadStream(currentFilePath, {
            highWaterMark: CHUNK_SIZE
        });
        let bytesRead = 0;
        readStream.on('data', (chunk) => {
            bytesRead += chunk.length;
            const canWrite = res.write(chunk);
            if (!canWrite) {
                readStream.pause();
            }
        });
        res.on('drain', () => {
            readStream.resume();
        });
        readStream.on('end', () => {
            res.end();
            console.log("Download Complete");
        });
        readStream.on('error', (err) => {
            console.error('Download Error:', err);
            res.end();
        });
        req.on('close', () => {
            readStream.destroy();
            console.log("Client disconnected");
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});



