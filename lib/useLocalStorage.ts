'use client';

import { useEffect, useState } from 'react';
import { LocalStorageData } from '@/types';

const STORAGE_KEY = 'gdrive-gallery-data';

export function useLocalStorage() {
  const [data, setData] = useState<LocalStorageData>({
    favorites: [],
    customNames: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing localStorage:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveData = (newData: LocalStorageData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const toggleFavorite = (fileId: string) => {
    const newFavorites = data.favorites.includes(fileId)
      ? data.favorites.filter((id) => id !== fileId)
      : [...data.favorites, fileId];
    
    saveData({ ...data, favorites: newFavorites });
  };

  const setCustomName = (fileId: string, customName: string) => {
    const newCustomNames = { ...data.customNames };
    if (customName.trim()) {
      newCustomNames[fileId] = customName;
    } else {
      delete newCustomNames[fileId];
    }
    saveData({ ...data, customNames: newCustomNames });
  };

  return {
    favorites: data.favorites,
    customNames: data.customNames,
    toggleFavorite,
    setCustomName,
    isLoaded,
  };
}
