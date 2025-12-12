const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filePath = path.join(__dirname, 'bigfile.txt');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get('/download', (req, res) => {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    
    const CHUNK_SIZE = 64 * 1024;
    const DELAY_MS = 100;      

    let start = 0;
    let end = fileSize - 1;
    let statusCode = 200;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        start = parseInt(parts[0], 10);
        end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        statusCode = 206;
    }

    const chunkLength = (end - start) + 1;

    const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkLength,
        'Content-Type': 'text/plain',
    };
    res.writeHead(statusCode, headers);

    const fileStream = fs.createReadStream(filePath, { 
        start, 
        end, 
        highWaterMark: CHUNK_SIZE 
    });

    fileStream.on('data', (chunk) => {
        fileStream.pause();  
        
        res.write(chunk, () => {
            setTimeout(() => {
                fileStream.resume();
            }, DELAY_MS);
        });
    });

    fileStream.on('end', () => res.end());
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});



