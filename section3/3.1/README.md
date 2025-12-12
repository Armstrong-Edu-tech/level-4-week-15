## Topic 3.1: File Download with Streaming and Range Requests

This folder demonstrates file streaming with HTTP range request support for efficient large file downloads.

### What it does:
- Serves a large file (`bigfile.txt`) for download
- Supports HTTP range requests (partial content) for resumable downloads
- Streams file in chunks (64KB) with controlled flow
- Implements backpressure handling to prevent memory issues

### Features:
- HTTP Range request support (206 Partial Content)
- Chunked file streaming (64KB chunks)
- Flow control with pause/resume
- Download progress support
- Web interface (index.html) for testing downloads

### API Endpoints:
- `GET /` - Serves the HTML interface
- `GET /download` - Downloads the file with range request support

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` to test the file download. The server supports resumable downloads if the connection is interrupted.