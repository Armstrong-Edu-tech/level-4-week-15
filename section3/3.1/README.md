## Topic 3.1: File Download with Streaming and Range Requests

This folder demonstrates file streaming with HTTP range request support for efficient large file downloads.

### What it does:
- Serves a file (`bigfile.txt`) for download
- Supports HTTP range requests (partial content) for resumable downloads
- Streams the file in 64KB chunks with a small delay between writes

### Features:
- HTTP Range request support (206 Partial Content)
- Chunked file streaming (64KB chunks)
- Throttled streaming with pause/resume
- Web interface for testing downloads

### API Endpoints:
- `GET /download` - Downloads the file with range request support

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` (or `PORT` from `.env`) to test the file download. The server supports resumable downloads if the connection is interrupted.