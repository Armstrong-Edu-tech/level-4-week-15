## Topic 3.3: File Upload and Download with Streaming

This folder demonstrates bidirectional file streaming for both upload and download operations with proper flow control.

### What it does:
- Allows users to upload files with streaming (chunked upload)
- Supports downloading uploaded files with range request support
- Implements backpressure handling for both upload and download
- Manages file streams efficiently to prevent memory issues

### Features:
- Chunked file upload (64KB chunks)
- Chunked file download with range request support
- Backpressure handling (pause/resume streams)
- Flow control for both directions
- Web interface (index.html)

### API Endpoints:
- `GET /` - Serves the HTML interface
- `POST /upload` - Uploads a file (requires `x-file-name` header)
- `GET /download` - Downloads the last uploaded file with range support

### Installation:
```bash
npm install
```

### Running:
```bash
node index.js
```

Open `http://localhost:3000` to test file upload and download. The system handles large files efficiently using streaming.