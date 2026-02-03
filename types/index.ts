export interface MediaFile {
  id: string;
  name: string;
  thumbnailLink?: string | null;
  mimeType: string;
  size?: string | null;
  webContentLink?: string | null;
  isVideo: boolean;
  isImage: boolean;
}

export interface MediaWithCustomName extends MediaFile {
  customName?: string;
  isFavorite?: boolean;
}

export type FilterType = 'all' | 'video' | 'image';

export interface LocalStorageData {
  favorites: string[];
  customNames: Record<string, string>;
}
