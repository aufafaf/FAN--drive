export interface MediaFile {
  id: string;
  name: string;
  thumbnailLink?: string;
  mimeType: string;
  size?: string;
  webContentLink?: string;
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
