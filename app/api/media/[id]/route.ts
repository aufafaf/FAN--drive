import { NextResponse } from 'next/server';
import { getMediaFile, formatFileSize } from '@/lib/googleDrive';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const file = await getMediaFile(params.id);

    const mediaFile = {
      id: file.id || '',
      name: file.name || 'Untitled',
      thumbnailLink: file.thumbnailLink,
      mimeType: file.mimeType || '',
      size: formatFileSize(file.size),
      webContentLink: file.webContentLink,
      webViewLink: file.webViewLink,
      isVideo: file.mimeType?.startsWith('video/') || false,
      isImage: file.mimeType?.startsWith('image/') || false,
    };

    return NextResponse.json({
      success: true,
      data: mediaFile,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch media file',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
