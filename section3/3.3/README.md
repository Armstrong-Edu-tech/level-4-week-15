## Topic 3.3: File Upload and Download with Streaming

This folder demonstrates bidirectional file streaming for both upload and download operations with proper flow control.

### What it does:
- Allows users to upload files with streaming
- Supports downloading the last uploaded file with range requests
- Streams files in 64KB chunks during download

### Features:
- Streamed file upload
- Chunked file download with range request support
- Web interface served from `public/index.html`

### API Endpoints:
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

Open `http://localhost:3000` (or `PORT` from `.env`) to test file upload and download.