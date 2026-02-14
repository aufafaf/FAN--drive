'use client';

import { useEffect, useState } from 'react';
import { LocalStorageData } from '@/types';

const STORAGE_KEY = 'gdrive-gallery-data';

export function useLocalStorage() {
  const [data, setData] = useState<LocalStorageData>({
    ratings: {},
    categories: {},
    customNames: {},
    categoryList: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migrate old data if exists
        if (parsed.favorites) {
          const newData: LocalStorageData = {
            ratings: {},
            categories: {},
            customNames: parsed.customNames || {},
            categoryList: [],
          };
          setData(newData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        } else {
          setData(parsed);
        }
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

  const setRating = (fileId: string, rating: number) => {
    const newRatings = { ...data.ratings };
    if (rating > 0 && rating <= 5) {
      newRatings[fileId] = rating;
    } else {
      delete newRatings[fileId];
    }
    saveData({ ...data, ratings: newRatings });
  };

  const setCategory = (fileId: string, category: string) => {
    const newCategories = { ...data.categories };
    if (category.trim()) {
      newCategories[fileId] = category;
      // Add category to list if not exists
      if (!data.categoryList.includes(category)) {
        const newCategoryList = [...data.categoryList, category];
        saveData({ ...data, categories: newCategories, categoryList: newCategoryList });
        return;
      }
    } else {
      delete newCategories[fileId];
    }
    saveData({ ...data, categories: newCategories });
  };

  const addCategory = (categoryName: string) => {
    if (categoryName.trim() && !data.categoryList.includes(categoryName)) {
      const newCategoryList = [...data.categoryList, categoryName];
      saveData({ ...data, categoryList: newCategoryList });
    }
  };

  const removeCategory = (categoryName: string) => {
    const newCategoryList = data.categoryList.filter(c => c !== categoryName);
    const newCategories = { ...data.categories };
    // Remove category from all files
    Object.keys(newCategories).forEach(fileId => {
      if (newCategories[fileId] === categoryName) {
        delete newCategories[fileId];
      }
    });
    saveData({ ...data, categoryList: newCategoryList, categories: newCategories });
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

  const exportData = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonString: string): boolean => {
    try {
      const imported = JSON.parse(jsonString);
      // Validate structure
      if (imported && typeof imported === 'object') {
        const newData: LocalStorageData = {
          ratings: imported.ratings || {},
          categories: imported.categories || {},
          customNames: imported.customNames || {},
          categoryList: imported.categoryList || [],
        };
        saveData(newData);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error importing data:', e);
      return false;
    }
  };

  const clearAllData = () => {
    const emptyData: LocalStorageData = {
      ratings: {},
      categories: {},
      customNames: {},
      categoryList: [],
    };
    saveData(emptyData);
  };

  return {
    ratings: data.ratings,
    categories: data.categories,
    customNames: data.customNames,
    categoryList: data.categoryList,
    setRating,
    setCategory,
    addCategory,
    removeCategory,
    setCustomName,
    exportData,
    importData,
    clearAllData,
    isLoaded,
  };
}