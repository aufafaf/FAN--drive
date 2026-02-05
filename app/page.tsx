// 'use client';

// import { useEffect, useState } from 'react';
// import { MediaFile, MediaWithCustomName, FilterType } from '@/types';
// import { useLocalStorage } from '@/lib/useLocalStorage';
// import FilterBar from '@/components/FilterBar';
// import MediaCard from '@/components/MediaCard';
// import { MediaGridSkeleton } from '@/components/MediaSkeleton';
// import { AlertCircle } from 'lucide-react';

// export default function HomePage() {
//   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

//   const { favorites, customNames, toggleFavorite, setCustomName, isLoaded } = useLocalStorage();

//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   const fetchMedia = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch('/api/media');
//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error || 'Failed to fetch media');
//       }

//       setMediaFiles(result.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const enrichedMedia: MediaWithCustomName[] = mediaFiles.map((media) => ({
//     ...media,
//     customName: customNames[media.id],
//     isFavorite: favorites.includes(media.id),
//   }));

//   const filteredMedia = enrichedMedia.filter((media) => {
//     // Filter by type
//     if (currentFilter === 'video' && !media.isVideo) return false;
//     if (currentFilter === 'image' && !media.isImage) return false;

//     // Filter by favorites
//     if (showFavoritesOnly && !media.isFavorite) return false;

//     // Filter by search query
//     if (searchQuery) {
//       const searchLower = searchQuery.toLowerCase();
//       const displayName = (media.customName || media.name).toLowerCase();
//       return displayName.includes(searchLower);
//     }

//     return true;
//   });

//   if (loading || !isLoaded) {
//     return (
//       <div className="container">
//         <header className="header">
//           <div className="header-content">
//             <h1 className="title">Media Gallery</h1>
//             <p className="subtitle">Loading your media collection...</p>
//           </div>
//         </header>
//         <MediaGridSkeleton />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container">
//         <header className="header">
//           <div className="header-content">
//             <h1 className="title">Media Gallery</h1>
//           </div>
//         </header>
//         <div className="error-message">
//           <AlertCircle size={48} />
//           <h2>Terjadi Kesalahan</h2>
//           <p>{error}</p>
//           <button onClick={fetchMedia} className="retry-btn">
//             Coba Lagi
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <header className="header">
//         <div className="header-content">
//           <h1 className="title">Media Gallery</h1>
//           <p className="subtitle">Koleksi video dan foto dari Google Drive</p>
//         </div>
//       </header>

//       <FilterBar
//         currentFilter={currentFilter}
//         onFilterChange={setCurrentFilter}
//         searchQuery={searchQuery}
//         onSearchChange={setSearchQuery}
//         showFavoritesOnly={showFavoritesOnly}
//         onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
//         totalCount={mediaFiles.length}
//         filteredCount={filteredMedia.length}
//       />

//       {filteredMedia.length === 0 ? (
//         <div className="empty-state">
//           <p>Tidak ada media yang ditemukan</p>
//           {(searchQuery || showFavoritesOnly || currentFilter !== 'all') && (
//             <button
//               onClick={() => {
//                 setSearchQuery('');
//                 setShowFavoritesOnly(false);
//                 setCurrentFilter('all');
//               }}
//               className="reset-btn"
//             >
//               Reset Filter
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="media-grid">
//           {filteredMedia.map((media) => (
//             <MediaCard
//               key={media.id}
//               media={media}
//               onToggleFavorite={toggleFavorite}
//               onUpdateName={setCustomName}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { MediaFile, MediaWithCustomName, FilterType } from "@/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import FilterBar from "@/components/FilterBar";
import MediaCard from "@/components/MediaCard";
import { MediaGridSkeleton } from "@/components/MediaSkeleton";
import { AlertCircle } from "lucide-react";

export default function HomePage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, customNames, toggleFavorite, setCustomName, isLoaded } =
    useLocalStorage();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Add cache busting untuk force refresh
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/media?t=${timestamp}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch media");
      }

      setMediaFiles(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchMedia(true);
  };

  const enrichedMedia: MediaWithCustomName[] = mediaFiles.map((media) => ({
    ...media,
    customName: customNames[media.id],
    isFavorite: favorites.includes(media.id),
  }));

  const filteredMedia = enrichedMedia.filter((media) => {
    // Filter by type
    if (currentFilter === "video" && !media.isVideo) return false;
    if (currentFilter === "image" && !media.isImage) return false;

    // Filter by favorites
    if (showFavoritesOnly && !media.isFavorite) return false;

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const displayName = (media.customName || media.name).toLowerCase();
      return displayName.includes(searchLower);
    }

    return true;
  });

  if (loading || !isLoaded) {
    return (
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1 className="title">Media Gallery</h1>
            <p className="subtitle">Loading your media collection...</p>
          </div>
        </header>
        <MediaGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1 className="title">Media Gallery</h1>
          </div>
        </header>
        <div className="error-message">
          <AlertCircle size={48} />
          <h2>Terjadi Kesalahan</h2>
          <p>{error}</p>
          <button onClick={() => fetchMedia()} className="retry-btn">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1 className="title">Media Gallery</h1>
          <p className="subtitle">Koleksi video dan foto dari Google Drive</p>
        </div>
      </header>

      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        totalCount={mediaFiles.length}
        filteredCount={filteredMedia.length}
      />

      {filteredMedia.length === 0 ? (
        <div className="empty-state">
          <p>Tidak ada media yang ditemukan</p>
          {(searchQuery || showFavoritesOnly || currentFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowFavoritesOnly(false);
                setCurrentFilter("all");
              }}
              className="reset-btn"
            >
              Reset Filter
            </button>
          )}
        </div>
      ) : (
        <div className="media-grid">
          {filteredMedia.map((media) => (
            <MediaCard
              key={media.id}
              media={media}
              onToggleFavorite={toggleFavorite}
              onUpdateName={setCustomName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
