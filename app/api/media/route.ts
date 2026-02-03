import { NextResponse } from 'next/server';
import { listMediaFiles, formatFileSize } from '@/lib/googleDrive';
import { MediaFile } from '@/types';

export async function GET() {
  try {
    const files = await listMediaFiles();

    const mediaFiles: MediaFile[] = files.map((file) => ({
      id: file.id || '',
      name: file.name || 'Untitled',
      thumbnailLink: file.thumbnailLink,
      mimeType: file.mimeType || '',
      size: formatFileSize(file.size),
      webContentLink: file.webContentLink,
      isVideo: file.mimeType?.startsWith('video/') || false,
      isImage: file.mimeType?.startsWith('image/') || false,
    }));

    return NextResponse.json({
      success: true,
      data: mediaFiles,
      total: mediaFiles.length,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch media files',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
