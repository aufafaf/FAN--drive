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

export async function listMediaFiles() {
  try {
    const drive = getGoogleDriveClient();
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    const response = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'video/' or mimeType contains 'image/') and trashed=false`,
      fields: 'files(id, name, thumbnailLink, mimeType, size, webContentLink)',
      pageSize: 1000,
    });

    return response.data.files || [];
  } catch (error) {
    console.error('Error fetching files from Google Drive:', error);
    throw error;
  }
}

export async function getMediaFile(fileId: string) {
  try {
    const drive = getGoogleDriveClient();

    const response = await drive.files.get({
      fileId,
      fields: 'id, name, thumbnailLink, mimeType, size, webContentLink, webViewLink',
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching file from Google Drive:', error);
    throw error;
  }
}

// export function formatFileSize(bytes?: string): string {
//   if (!bytes) return 'N/A';
//   const size = parseInt(bytes, 10);
//   if (size < 1024) return `${size} B`;
//   if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
//   if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
//   return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
// }

export function formatFileSize(bytes?: string | null): string {
  if (!bytes) return 'N/A';

  const size = parseInt(bytes, 10);
  if (isNaN(size)) return 'N/A';

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;

  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
