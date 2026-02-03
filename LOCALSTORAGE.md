# 📦 LocalStorage Structure

## Overview

Website ini menggunakan localStorage browser untuk menyimpan preferensi user secara persistent tanpa perlu database atau authentication.

## Storage Key

```
gdrive-gallery-data
```

## Data Structure

```typescript
interface LocalStorageData {
  favorites: string[];              // Array of file IDs
  customNames: Record<string, string>;  // Map of fileId → customName
}
```

## Example Data

```json
{
  "favorites": [
    "1ABC123def456GHI789jkl",
    "2DEF456ghi789JKL012mno"
  ],
  "customNames": {
    "1ABC123def456GHI789jkl": "My Wedding Video",
    "3GHI789jkl012MNO345pqr": "Vacation Photos 2024"
  }
}
```

## Features

### 1. Favorites System

**Add to Favorites:**
```typescript
favorites: ["file-id-1", "file-id-2", "file-id-3"]
```

**Check if Favorite:**
```typescript
const isFavorite = favorites.includes(fileId);
```

**Toggle Favorite:**
```typescript
const newFavorites = favorites.includes(fileId)
  ? favorites.filter(id => id !== fileId)  // Remove
  : [...favorites, fileId];                 // Add
```

### 2. Custom Names

**Set Custom Name:**
```typescript
customNames: {
  "file-id-1": "My Custom Name",
  "file-id-2": "Another Name"
}
```

**Get Display Name:**
```typescript
const displayName = customNames[fileId] || originalName;
```

**Remove Custom Name:**
```typescript
// Set empty string or delete key
delete customNames[fileId];
```

## Hook Usage

```typescript
import { useLocalStorage } from '@/lib/useLocalStorage';

function Component() {
  const { 
    favorites,       // string[]
    customNames,     // Record<string, string>
    toggleFavorite,  // (fileId: string) => void
    setCustomName,   // (fileId: string, name: string) => void
    isLoaded         // boolean
  } = useLocalStorage();

  // Use the data and functions
}
```

## Implementation Details

### Hook: `useLocalStorage()`

Located in: `/lib/useLocalStorage.ts`

**Features:**
- Automatic initialization from localStorage
- Synchronous updates (immediately reflected in UI)
- Persistent across page reloads
- Type-safe with TypeScript

**Methods:**

#### `toggleFavorite(fileId: string)`
Add or remove file from favorites list.

#### `setCustomName(fileId: string, customName: string)`
Set custom display name for a file. Empty string removes custom name.

#### `isLoaded: boolean`
Indicates if localStorage data has been loaded (prevents hydration errors).

## Storage Limits

- **Browser Limit**: ~5-10MB per domain
- **Current Usage**: Minimal (few KB for typical use)
- **Scalability**: Can handle thousands of files

## Browser Compatibility

✅ Chrome, Firefox, Safari, Edge (all modern versions)
✅ Mobile browsers (iOS Safari, Chrome Mobile)
❌ Private/Incognito mode may have limitations

## Clearing Data

### Programmatically
```javascript
localStorage.removeItem('gdrive-gallery-data');
```

### Via Browser DevTools
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Select Local Storage
4. Find key: `gdrive-gallery-data`
5. Right click → Delete

### Reset Feature
Add this to your component:
```typescript
const resetData = () => {
  localStorage.removeItem('gdrive-gallery-data');
  window.location.reload();
};
```

## Migration & Versioning

If you need to change data structure in future:

```typescript
const STORAGE_VERSION = 1;

interface LocalStorageData {
  version: number;
  favorites: string[];
  customNames: Record<string, string>;
}

// On load, check version and migrate if needed
if (data.version !== STORAGE_VERSION) {
  migrateData(data);
}
```

## Privacy Notes

- ✅ Data stored locally in user's browser
- ✅ Never sent to server
- ✅ User has full control
- ✅ Can be cleared anytime
- ⚠️ Lost if browser data cleared
- ⚠️ Not synced across devices

## Future Enhancements

Possible improvements:
1. **Cloud Sync** - Sync across devices with user account
2. **Export/Import** - Download/upload preferences as JSON
3. **Backup** - Auto-backup to cloud storage
4. **Sharing** - Share favorite lists with others
5. **Collections** - Group media into custom collections

## Testing

Test localStorage in development:

```javascript
// In browser console

// View current data
JSON.parse(localStorage.getItem('gdrive-gallery-data'))

// Set test data
localStorage.setItem('gdrive-gallery-data', JSON.stringify({
  favorites: ['test-id-1', 'test-id-2'],
  customNames: { 'test-id-1': 'Test Name' }
}))

// Clear data
localStorage.removeItem('gdrive-gallery-data')
```

---

**Note**: Always handle localStorage operations in try-catch blocks to prevent errors in browsers with storage disabled.
