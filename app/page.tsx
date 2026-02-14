// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { MediaFile, MediaWithCustomName, FilterType } from '@/types';
// // // import { useLocalStorage } from '@/lib/useLocalStorage';
// // // import FilterBar from '@/components/FilterBar';
// // // import MediaCard from '@/components/MediaCard';
// // // import { MediaGridSkeleton } from '@/components/MediaSkeleton';
// // // import { AlertCircle } from 'lucide-react';

// // // export default function HomePage() {
// // //   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

// // //   const { favorites, customNames, toggleFavorite, setCustomName, isLoaded } = useLocalStorage();

// // //   useEffect(() => {
// // //     fetchMedia();
// // //   }, []);

// // //   const fetchMedia = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const response = await fetch('/api/media');
// // //       const result = await response.json();

// // //       if (!result.success) {
// // //         throw new Error(result.error || 'Failed to fetch media');
// // //       }

// // //       setMediaFiles(result.data);
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : 'An error occurred');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const enrichedMedia: MediaWithCustomName[] = mediaFiles.map((media) => ({
// // //     ...media,
// // //     customName: customNames[media.id],
// // //     isFavorite: favorites.includes(media.id),
// // //   }));

// // //   const filteredMedia = enrichedMedia.filter((media) => {
// // //     // Filter by type
// // //     if (currentFilter === 'video' && !media.isVideo) return false;
// // //     if (currentFilter === 'image' && !media.isImage) return false;

// // //     // Filter by favorites
// // //     if (showFavoritesOnly && !media.isFavorite) return false;

// // //     // Filter by search query
// // //     if (searchQuery) {
// // //       const searchLower = searchQuery.toLowerCase();
// // //       const displayName = (media.customName || media.name).toLowerCase();
// // //       return displayName.includes(searchLower);
// // //     }

// // //     return true;
// // //   });

// // //   if (loading || !isLoaded) {
// // //     return (
// // //       <div className="container">
// // //         <header className="header">
// // //           <div className="header-content">
// // //             <h1 className="title">Media Gallery</h1>
// // //             <p className="subtitle">Loading your media collection...</p>
// // //           </div>
// // //         </header>
// // //         <MediaGridSkeleton />
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="container">
// // //         <header className="header">
// // //           <div className="header-content">
// // //             <h1 className="title">Media Gallery</h1>
// // //           </div>
// // //         </header>
// // //         <div className="error-message">
// // //           <AlertCircle size={48} />
// // //           <h2>Terjadi Kesalahan</h2>
// // //           <p>{error}</p>
// // //           <button onClick={fetchMedia} className="retry-btn">
// // //             Coba Lagi
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="container">
// // //       <header className="header">
// // //         <div className="header-content">
// // //           <h1 className="title">Media Gallery</h1>
// // //           <p className="subtitle">Koleksi video dan foto dari Google Drive</p>
// // //         </div>
// // //       </header>

// // //       <FilterBar
// // //         currentFilter={currentFilter}
// // //         onFilterChange={setCurrentFilter}
// // //         searchQuery={searchQuery}
// // //         onSearchChange={setSearchQuery}
// // //         showFavoritesOnly={showFavoritesOnly}
// // //         onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
// // //         totalCount={mediaFiles.length}
// // //         filteredCount={filteredMedia.length}
// // //       />

// // //       {filteredMedia.length === 0 ? (
// // //         <div className="empty-state">
// // //           <p>Tidak ada media yang ditemukan</p>
// // //           {(searchQuery || showFavoritesOnly || currentFilter !== 'all') && (
// // //             <button
// // //               onClick={() => {
// // //                 setSearchQuery('');
// // //                 setShowFavoritesOnly(false);
// // //                 setCurrentFilter('all');
// // //               }}
// // //               className="reset-btn"
// // //             >
// // //               Reset Filter
// // //             </button>
// // //           )}
// // //         </div>
// // //       ) : (
// // //         <div className="media-grid">
// // //           {filteredMedia.map((media) => (
// // //             <MediaCard
// // //               key={media.id}
// // //               media={media}
// // //               onToggleFavorite={toggleFavorite}
// // //               onUpdateName={setCustomName}
// // //             />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { MediaFile, MediaWithCustomName, FilterType } from "@/types";
// // import { useLocalStorage } from "@/lib/useLocalStorage";
// // import FilterBar from "@/components/FilterBar";
// // import MediaCard from "@/components/MediaCard";
// // import { MediaGridSkeleton } from "@/components/MediaSkeleton";
// // import { AlertCircle } from "lucide-react";

// // export default function HomePage() {
// //   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

// //   const { favorites, customNames, toggleFavorite, setCustomName, isLoaded } =
// //     useLocalStorage();

// //   useEffect(() => {
// //     fetchMedia();
// //   }, []);

// //   const fetchMedia = async (isRefresh = false) => {
// //     try {
// //       if (isRefresh) {
// //         setRefreshing(true);
// //       } else {
// //         setLoading(true);
// //       }
// //       setError(null);

// //       // Add cache busting untuk force refresh
// //       const timestamp = new Date().getTime();
// //       const response = await fetch(`/api/media?t=${timestamp}`);
// //       const result = await response.json();

// //       if (!result.success) {
// //         throw new Error(result.error || "Failed to fetch media");
// //       }

// //       setMediaFiles(result.data);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "An error occurred");
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   };

// //   const handleRefresh = () => {
// //     fetchMedia(true);
// //   };

// //   const enrichedMedia: MediaWithCustomName[] = mediaFiles.map((media) => ({
// //     ...media,
// //     customName: customNames[media.id],
// //     isFavorite: favorites.includes(media.id),
// //   }));

// //   const filteredMedia = enrichedMedia.filter((media) => {
// //     // Filter by type
// //     if (currentFilter === "video" && !media.isVideo) return false;
// //     if (currentFilter === "image" && !media.isImage) return false;

// //     // Filter by favorites
// //     if (showFavoritesOnly && !media.isFavorite) return false;

// //     // Filter by search query
// //     if (searchQuery) {
// //       const searchLower = searchQuery.toLowerCase();
// //       const displayName = (media.customName || media.name).toLowerCase();
// //       return displayName.includes(searchLower);
// //     }

// //     return true;
// //   });

// //   if (loading || !isLoaded) {
// //     return (
// //       <div className="container">
// //         <header className="header">
// //           <div className="header-content">
// //             <h1 className="title">Media Gallery</h1>
// //             <p className="subtitle">Loading your media collection...</p>
// //           </div>
// //         </header>
// //         <MediaGridSkeleton />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="container">
// //         <header className="header">
// //           <div className="header-content">
// //             <h1 className="title">Media Gallery</h1>
// //           </div>
// //         </header>
// //         <div className="error-message">
// //           <AlertCircle size={48} />
// //           <h2>Terjadi Kesalahan</h2>
// //           <p>{error}</p>
// //           <button onClick={() => fetchMedia()} className="retry-btn">
// //             Coba Lagi
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container">
// //       <header className="header">
// //         <div className="header-content">
// //           <h1 className="title">Media Gallery</h1>
// //           <p className="subtitle">Koleksi video dan foto dari Google Drive</p>
// //         </div>
// //       </header>

// //       <FilterBar
// //         currentFilter={currentFilter}
// //         onFilterChange={setCurrentFilter}
// //         searchQuery={searchQuery}
// //         onSearchChange={setSearchQuery}
// //         showFavoritesOnly={showFavoritesOnly}
// //         onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
// //         onRefresh={handleRefresh}
// //         isRefreshing={refreshing}
// //         totalCount={mediaFiles.length}
// //         filteredCount={filteredMedia.length}
// //       />

// //       {filteredMedia.length === 0 ? (
// //         <div className="empty-state">
// //           <p>Tidak ada media yang ditemukan</p>
// //           {(searchQuery || showFavoritesOnly || currentFilter !== "all") && (
// //             <button
// //               onClick={() => {
// //                 setSearchQuery("");
// //                 setShowFavoritesOnly(false);
// //                 setCurrentFilter("all");
// //               }}
// //               className="reset-btn"
// //             >
// //               Reset Filter
// //             </button>
// //           )}
// //         </div>
// //       ) : (
// //         <div className="media-grid">
// //           {filteredMedia.map((media) => (
// //             <MediaCard
// //               key={media.id}
// //               media={media}
// //               onToggleFavorite={toggleFavorite}
// //               onUpdateName={setCustomName}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { MediaFile, MediaWithCustomName, FilterType } from "@/types";
// import { useLocalStorage } from "@/lib/useLocalStorage";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import FilterBar from "@/components/FilterBar";
// import MediaCard from "@/components/MediaCard";
// import RatingModal from "@/components/RatingModal";
// import CategoryModal from "@/components/CategoryModal";
// import { MediaGridSkeleton } from "@/components/MediaSkeleton";
// import { AlertCircle } from "lucide-react";

// export default function HomePage() {
//   const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   // Modal states
//   const [ratingModalOpen, setRatingModalOpen] = useState(false);
//   const [categoryModalOpen, setCategoryModalOpen] = useState(false);
//   const [selectedMedia, setSelectedMedia] =
//     useState<MediaWithCustomName | null>(null);

//   const {
//     ratings,
//     categories,
//     customNames,
//     categoryList,
//     setRating,
//     setCategory,
//     addCategory,
//     setCustomName,
//     isLoaded,
//   } = useLocalStorage();

//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   const fetchMedia = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
//       setError(null);

//       // Add cache busting untuk force refresh
//       const timestamp = new Date().getTime();
//       const response = await fetch(`/api/media?t=${timestamp}`);
//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error || "Failed to fetch media");
//       }

//       setMediaFiles(result.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleRefresh = () => {
//     fetchMedia(true);
//   };

//   const enrichedMedia: MediaWithCustomName[] = mediaFiles.map((media) => ({
//     ...media,
//     customName: customNames[media.id],
//     rating: ratings[media.id],
//     category: categories[media.id],
//   }));

//   const filteredMedia = enrichedMedia.filter((media) => {
//     // Filter by type
//     if (currentFilter === "video" && !media.isVideo) return false;
//     if (currentFilter === "image" && !media.isImage) return false;

//     // Filter by rating
//     if (selectedRating > 0 && media.rating !== selectedRating) return false;

//     // Filter by category
//     if (selectedCategory && media.category !== selectedCategory) return false;

//     // Filter by search query
//     if (searchQuery) {
//       const searchLower = searchQuery.toLowerCase();
//       const displayName = (media.customName || media.name).toLowerCase();
//       return displayName.includes(searchLower);
//     }

//     return true;
//   });

//   const handleOpenRating = (media: MediaWithCustomName) => {
//     setSelectedMedia(media);
//     setRatingModalOpen(true);
//   };

//   const handleOpenCategory = (media: MediaWithCustomName) => {
//     setSelectedMedia(media);
//     setCategoryModalOpen(true);
//   };

//   const handleSetRating = (rating: number) => {
//     if (selectedMedia) {
//       setRating(selectedMedia.id, rating);
//     }
//   };

//   const handleSetCategory = (category: string) => {
//     if (selectedMedia) {
//       setCategory(selectedMedia.id, category);
//     }
//   };

//   const handleAddCategory = (categoryName: string) => {
//     addCategory(categoryName);
//     if (selectedMedia) {
//       setCategory(selectedMedia.id, categoryName);
//     }
//   };

//   if (loading || !isLoaded) {
//     return (
//       <>
//         <Navbar />
//         <div className="container">
//           <header className="header">
//             <div className="header-content">
//               <h1 className="title">Media Gallery</h1>
//               <p className="subtitle">Loading your media collection...</p>
//             </div>
//           </header>
//           <MediaGridSkeleton />
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Navbar />
//         <div className="container">
//           <header className="header">
//             <div className="header-content">
//               <h1 className="title">Media Gallery</h1>
//             </div>
//           </header>
//           <div className="error-message">
//             <AlertCircle size={48} />
//             <h2>Terjadi Kesalahan</h2>
//             <p>{error}</p>
//             {/* <button onClick={fetchMedia} className="retry-btn">
//               Coba Lagi
//             </button> */}
//             <button onClick={() => fetchMedia()} className="retry-btn">
//               Coba Lagi
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <header className="header">
//           <div className="header-content">
//             <h1 className="title">Media Gallery</h1>
//             <p className="subtitle">Koleksi video dan foto dari Google Drive</p>
//           </div>
//         </header>

//         <FilterBar
//           currentFilter={currentFilter}
//           onFilterChange={setCurrentFilter}
//           searchQuery={searchQuery}
//           onSearchChange={setSearchQuery}
//           selectedRating={selectedRating}
//           onRatingFilterChange={setSelectedRating}
//           selectedCategory={selectedCategory}
//           onCategoryFilterChange={setSelectedCategory}
//           categoryList={categoryList}
//           onRefresh={handleRefresh}
//           isRefreshing={refreshing}
//           totalCount={mediaFiles.length}
//           filteredCount={filteredMedia.length}
//         />

//         {filteredMedia.length === 0 ? (
//           <div className="empty-state">
//             <p>Tidak ada media yang ditemukan</p>
//             {(searchQuery ||
//               selectedRating > 0 ||
//               selectedCategory ||
//               currentFilter !== "all") && (
//               <button
//                 onClick={() => {
//                   setSearchQuery("");
//                   setSelectedRating(0);
//                   setSelectedCategory("");
//                   setCurrentFilter("all");
//                 }}
//                 className="reset-btn"
//               >
//                 Reset Filter
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="media-grid">
//             {filteredMedia.map((media) => (
//               <MediaCard
//                 key={media.id}
//                 media={media}
//                 onOpenRating={handleOpenRating}
//                 onOpenCategory={handleOpenCategory}
//                 onUpdateName={setCustomName}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <RatingModal
//         isOpen={ratingModalOpen}
//         currentRating={selectedMedia?.rating}
//         onClose={() => {
//           setRatingModalOpen(false);
//           setSelectedMedia(null);
//         }}
//         onRate={handleSetRating}
//         mediaName={selectedMedia?.customName || selectedMedia?.name || ""}
//       />

//       <CategoryModal
//         isOpen={categoryModalOpen}
//         currentCategory={selectedMedia?.category}
//         categoryList={categoryList}
//         onClose={() => {
//           setCategoryModalOpen(false);
//           setSelectedMedia(null);
//         }}
//         onSelectCategory={handleSetCategory}
//         onAddCategory={handleAddCategory}
//         mediaName={selectedMedia?.customName || selectedMedia?.name || ""}
//       />

//       <Footer />
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { MediaFile, MediaWithCustomName, FilterType } from "@/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import MediaCard from "@/components/MediaCard";
import RatingModal from "@/components/RatingModal";
import CategoryModal from "@/components/CategoryModal";
import SettingsModal from "@/components/SettingsModal";
import { MediaGridSkeleton } from "@/components/MediaSkeleton";
import { AlertCircle } from "lucide-react";

export default function HomePage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Modal states
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] =
    useState<MediaWithCustomName | null>(null);

  const {
    ratings,
    categories,
    customNames,
    categoryList,
    setRating,
    setCategory,
    addCategory,
    setCustomName,
    exportData,
    importData,
    clearAllData,
    isLoaded,
  } = useLocalStorage();

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
    rating: ratings[media.id],
    category: categories[media.id],
  }));

  const filteredMedia = enrichedMedia.filter((media) => {
    // Filter by type
    if (currentFilter === "video" && !media.isVideo) return false;
    if (currentFilter === "image" && !media.isImage) return false;

    // Filter by rating
    if (selectedRating > 0 && media.rating !== selectedRating) return false;

    // Filter by category
    if (selectedCategory && media.category !== selectedCategory) return false;

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const displayName = (media.customName || media.name).toLowerCase();
      return displayName.includes(searchLower);
    }

    return true;
  });

  const handleOpenRating = (media: MediaWithCustomName) => {
    setSelectedMedia(media);
    setRatingModalOpen(true);
  };

  const handleOpenCategory = (media: MediaWithCustomName) => {
    setSelectedMedia(media);
    setCategoryModalOpen(true);
  };

  const handleSetRating = (rating: number) => {
    if (selectedMedia) {
      setRating(selectedMedia.id, rating);
    }
  };

  const handleSetCategory = (category: string) => {
    if (selectedMedia) {
      setCategory(selectedMedia.id, category);
    }
  };

  const handleAddCategory = (categoryName: string) => {
    addCategory(categoryName);
    if (selectedMedia) {
      setCategory(selectedMedia.id, categoryName);
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `media-gallery-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (jsonString: string) => {
    const success = importData(jsonString);
    if (success) {
      alert("✅ Data imported successfully! Refreshing...");
      window.location.reload();
    } else {
      alert("❌ Failed to import data. Please check the format.");
    }
  };

  const handleClearAll = () => {
    clearAllData();
    alert("🗑️ All data cleared successfully!");
  };

  if (loading || !isLoaded) {
    return (
      <>
        <Navbar />
        <div className="container">
          <header className="header">
            <div className="header-content">
              <h1 className="title">Media Gallery</h1>
              <p className="subtitle">Loading your media collection...</p>
            </div>
          </header>
          <MediaGridSkeleton />
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
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
            {/* <button onClick={fetchMedia} className="retry-btn">
              Coba Lagi
            </button> */}
            <button onClick={() => fetchMedia()} className="retry-btn">
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar onOpenSettings={() => setSettingsModalOpen(true)} />
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
          selectedRating={selectedRating}
          onRatingFilterChange={setSelectedRating}
          selectedCategory={selectedCategory}
          onCategoryFilterChange={setSelectedCategory}
          categoryList={categoryList}
          onRefresh={handleRefresh}
          isRefreshing={refreshing}
          totalCount={mediaFiles.length}
          filteredCount={filteredMedia.length}
        />

        {filteredMedia.length === 0 ? (
          <div className="empty-state">
            <p>Tidak ada media yang ditemukan</p>
            {(searchQuery ||
              selectedRating > 0 ||
              selectedCategory ||
              currentFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRating(0);
                  setSelectedCategory("");
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
                onOpenRating={handleOpenRating}
                onOpenCategory={handleOpenCategory}
                onUpdateName={setCustomName}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <RatingModal
        isOpen={ratingModalOpen}
        currentRating={selectedMedia?.rating}
        onClose={() => {
          setRatingModalOpen(false);
          setSelectedMedia(null);
        }}
        onRate={handleSetRating}
        mediaName={selectedMedia?.customName || selectedMedia?.name || ""}
      />

      <CategoryModal
        isOpen={categoryModalOpen}
        currentCategory={selectedMedia?.category}
        categoryList={categoryList}
        onClose={() => {
          setCategoryModalOpen(false);
          setSelectedMedia(null);
        }}
        onSelectCategory={handleSetCategory}
        onAddCategory={handleAddCategory}
        mediaName={selectedMedia?.customName || selectedMedia?.name || ""}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        onExport={handleExport}
        onImport={handleImport}
        onClearAll={handleClearAll}
      />

      <Footer />
    </>
  );
}
