# 🔌 API Documentation

## Overview

Website ini menggunakan Next.js API Routes sebagai middleman antara frontend dan Google Drive API. Ini memastikan credentials tidak ter-expose di client-side.

---

## Endpoints

### 1. List All Media

**Endpoint:** `GET /api/media`

**Description:** Fetch semua video dan foto dari Google Drive folder.

**Request:**
```http
GET /api/media HTTP/1.1
Host: your-domain.com
```

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "1ABC123def456GHI789jkl",
      "name": "summer-vacation.mp4",
      "thumbnailLink": "https://lh3.googleusercontent.com/...",
      "mimeType": "video/mp4",
      "size": "25.4 MB",
      "webContentLink": "https://drive.google.com/uc?id=...",
      "isVideo": true,
      "isImage": false
    },
    {
      "id": "2DEF456ghi789JKL012mno",
      "name": "beach-photo.jpg",
      "thumbnailLink": "https://lh3.googleusercontent.com/...",
      "mimeType": "image/jpeg",
      "size": "2.1 MB",
      "webContentLink": "https://drive.google.com/uc?id=...",
      "isVideo": false,
      "isImage": true
    }
  ],
  "total": 2
}
```

**Response Error (500):**
```json
{
  "success": false,
  "error": "Failed to fetch media files",
  "message": "Error details here"
}
```

**Query Parameters:** None

**Rate Limit:** No limit (depends on Google Drive API quota)

---

### 2. Get Media Detail

**Endpoint:** `GET /api/media/[id]`

**Description:** Fetch detail single media file by ID.

**Request:**
```http
GET /api/media/1ABC123def456GHI789jkl HTTP/1.1
Host: your-domain.com
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "1ABC123def456GHI789jkl",
    "name": "summer-vacation.mp4",
    "thumbnailLink": "https://lh3.googleusercontent.com/...",
    "mimeType": "video/mp4",
    "size": "25.4 MB",
    "webContentLink": "https://drive.google.com/uc?id=...",
    "webViewLink": "https://drive.google.com/file/d/.../view",
    "isVideo": true,
    "isImage": false
  }
}
```

**Response Error (500):**
```json
{
  "success": false,
  "error": "Failed to fetch media file",
  "message": "File not found"
}
```

**Path Parameters:**
- `id` (string, required): Google Drive file ID

**Rate Limit:** No limit (depends on Google Drive API quota)

---

## Data Types

### MediaFile

```typescript
interface MediaFile {
  id: string;              // Google Drive file ID
  name: string;            // Original filename
  thumbnailLink?: string;  // Thumbnail URL (optional)
  mimeType: string;        // MIME type (e.g., "video/mp4")
  size?: string;           // Formatted file size (e.g., "10.5 MB")
  webContentLink?: string; // Direct download URL
  webViewLink?: string;    // Google Drive preview URL (detail only)
  isVideo: boolean;        // True if video/* MIME type
  isImage: boolean;        // True if image/* MIME type
}
```

### API Response

```typescript
// Success Response
interface SuccessResponse {
  success: true;
  data: MediaFile | MediaFile[];
  total?: number;  // Only in list endpoint
}

// Error Response
interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}
```

---

## Google Drive API Integration

### Service Configuration

Location: `/lib/googleDrive.ts`

```typescript
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

export function getGoogleDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
}
```

### List Files Query

```typescript
const response = await drive.files.list({
  q: `'${folderId}' in parents and (mimeType contains 'video/' or mimeType contains 'image/') and trashed=false`,
  fields: 'files(id, name, thumbnailLink, mimeType, size, webContentLink)',
  pageSize: 1000,
});
```

**Query Breakdown:**
- `'${folderId}' in parents` - Files in specific folder
- `mimeType contains 'video/' or mimeType contains 'image/'` - Only media
- `trashed=false` - Exclude deleted files
- `pageSize: 1000` - Max results per request

---

## Error Handling

### Common Errors

#### 1. Authentication Error
```json
{
  "success": false,
  "error": "Failed to fetch media files",
  "message": "invalid_grant: Invalid JWT Signature"
}
```

**Cause:** Invalid Google credentials

**Solution:**
- Check `GOOGLE_CLIENT_EMAIL`
- Verify `GOOGLE_PRIVATE_KEY` format
- Ensure credentials are from correct service account

#### 2. Permission Error
```json
{
  "success": false,
  "error": "Failed to fetch media files",
  "message": "The user does not have sufficient permissions"
}
```

**Cause:** Service account doesn't have folder access

**Solution:**
- Share folder with service account email
- Grant at least Viewer permission

#### 3. Folder Not Found
```json
{
  "success": false,
  "error": "Failed to fetch media files",
  "message": "File not found"
}
```

**Cause:** Invalid `GOOGLE_DRIVE_FOLDER_ID`

**Solution:**
- Verify folder ID from Google Drive URL
- Ensure folder exists and is accessible

#### 4. Quota Exceeded
```json
{
  "success": false,
  "error": "Failed to fetch media files",
  "message": "User rate limit exceeded"
}
```

**Cause:** Too many API requests

**Solution:**
- Implement caching
- Add rate limiting
- Request quota increase from Google

---

## Caching Strategy

### Current Implementation
No caching (always fetch fresh data)

### Recommended Implementation

#### Server-Side Caching (Next.js)

```typescript
import { unstable_cache } from 'next/cache';

export const getMediaFiles = unstable_cache(
  async () => {
    return await listMediaFiles();
  },
  ['media-files'],
  {
    revalidate: 300, // 5 minutes
    tags: ['media']
  }
);
```

#### Client-Side Caching (SWR)

```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function useMedia() {
  const { data, error, isLoading } = useSWR('/api/media', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 300000, // 5 minutes
  });

  return {
    media: data?.data,
    isLoading,
    isError: error,
  };
}
```

---

## Security

### Current Measures

1. **Credentials Protection**
   - ✅ API keys only on server-side
   - ✅ Never exposed to client
   - ✅ Environment variables

2. **API Routes as Proxy**
   - ✅ Frontend → API Routes → Google Drive
   - ✅ Credentials stay in backend
   - ✅ CORS handled automatically

3. **Read-Only Access**
   - ✅ Service account has Viewer permission only
   - ✅ Cannot modify/delete files
   - ✅ Minimal security risk

### Recommended Enhancements

1. **Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   ```

2. **API Key Authentication**
   ```typescript
   // Protect API routes
   const API_KEY = process.env.INTERNAL_API_KEY;
   
   export async function GET(request: Request) {
     const apiKey = request.headers.get('x-api-key');
     
     if (apiKey !== API_KEY) {
       return NextResponse.json(
         { error: 'Unauthorized' },
         { status: 401 }
       );
     }
     
     // Continue...
   }
   ```

3. **CORS Configuration**
   ```typescript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
             { key: 'Access-Control-Allow-Methods', value: 'GET' },
           ],
         },
       ];
     },
   };
   ```

---

## Testing

### Manual Testing

**Test List Endpoint:**
```bash
curl http://localhost:3000/api/media
```

**Test Detail Endpoint:**
```bash
curl http://localhost:3000/api/media/YOUR_FILE_ID
```

### Automated Testing (Jest)

```typescript
import { GET } from '@/app/api/media/route';

describe('/api/media', () => {
  it('returns media list', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.total).toBeGreaterThan(0);
  });
});
```

---

## Performance Optimization

### Current Performance
- Fresh fetch on every request
- ~500-1000ms response time (depends on Drive API)

### Optimization Tips

1. **Enable Caching** (as shown above)
2. **Pagination** for large libraries
3. **Lazy Loading** thumbnails
4. **CDN** for static assets
5. **Compression** (gzip/brotli)

---

## Google Drive API Quotas

**Default Limits:**
- 1,000 requests per 100 seconds per user
- 10,000 requests per 100 seconds per project

**Monitor Usage:**
- Google Cloud Console → APIs & Services → Dashboard
- View quota usage and remaining

**Request Increase:**
- If needed, request quota increase from Google
- Usually approved within 24-48 hours

---

## Future API Enhancements

### Possible Additions

1. **Upload API**
   ```typescript
   POST /api/media/upload
   ```

2. **Delete API**
   ```typescript
   DELETE /api/media/[id]
   ```

3. **Update Metadata**
   ```typescript
   PATCH /api/media/[id]
   ```

4. **Search API**
   ```typescript
   GET /api/media/search?q=query
   ```

5. **Folder Structure**
   ```typescript
   GET /api/folders
   ```

---

## Support Resources

- [Google Drive API Docs](https://developers.google.com/drive/api/v3/reference)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [googleapis npm package](https://www.npmjs.com/package/googleapis)

---

**Questions?** Check the main README.md or create an issue on GitHub.
