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
  rating?: number; // 1-5 stars
  category?: string;
}

export type FilterType = 'all' | 'video' | 'image';

export interface LocalStorageData {
  ratings: Record<string, number>; // fileId → rating (1-5)
  categories: Record<string, string>; // fileId → category name
  customNames: Record<string, string>; // fileId → custom name
  categoryList: string[]; // List of user-defined categories
}