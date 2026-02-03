'use client';

import { Search, Grid, Video, Image, Heart } from 'lucide-react';
import { FilterType } from '@/types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterBar({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Cari media..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            <Grid size={18} />
            Semua
          </button>
          <button
            className={`filter-btn ${currentFilter === 'video' ? 'active' : ''}`}
            onClick={() => onFilterChange('video')}
          >
            <Video size={18} />
            Video
          </button>
          <button
            className={`filter-btn ${currentFilter === 'image' ? 'active' : ''}`}
            onClick={() => onFilterChange('image')}
          >
            <Image size={18} />
            Foto
          </button>
          <button
            className={`filter-btn favorite-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleFavoritesOnly}
          >
            <Heart size={18} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
            Favorit
          </button>
        </div>
      </div>

      <div className="media-count">
        Menampilkan <span className="count-highlight">{filteredCount}</span> dari{' '}
        <span className="count-highlight">{totalCount}</span> media
      </div>
    </div>
  );
}
