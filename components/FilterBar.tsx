'use client';

import { Search, Grid, Video, Image, RefreshCw, Star, Folder, X } from 'lucide-react';
import { FilterType } from '@/types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRating: number;
  onRatingFilterChange: (rating: number) => void;
  selectedCategory: string;
  onCategoryFilterChange: (category: string) => void;
  categoryList: string[];
  onRefresh: () => void;
  isRefreshing?: boolean;
  totalCount: number;
  filteredCount: number;
}

export default function FilterBar({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedRating,
  onRatingFilterChange,
  selectedCategory,
  onCategoryFilterChange,
  categoryList,
  onRefresh,
  isRefreshing = false,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      {/* Main Controls */}
      <div className="filter-controls">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search media..."
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
            <Grid size={16} />
            All
          </button>
          <button
            className={`filter-btn ${currentFilter === 'video' ? 'active' : ''}`}
            onClick={() => onFilterChange('video')}
          >
            <Video size={16} />
            Videos
          </button>
          <button
            className={`filter-btn ${currentFilter === 'image' ? 'active' : ''}`}
            onClick={() => onFilterChange('image')}
          >
            <Image size={16} />
            Photos
          </button>
          <button
            className="filter-btn refresh-btn"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh data"
          >
            <RefreshCw 
              size={16} 
              className={isRefreshing ? 'spinning' : ''} 
            />
          </button>
        </div>
      </div>

      {/* Rating Filter - Beautiful Stars */}
      <div className="filter-section">
        <div className="filter-label">
          <Star size={16} />
          <span>Filter by Rating</span>
        </div>
        <div className="rating-filter-buttons">
          <button
            className={`rating-filter-btn ${selectedRating === 0 ? 'active' : ''}`}
            onClick={() => onRatingFilterChange(0)}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={`rating-filter-btn ${selectedRating === rating ? 'active' : ''}`}
              onClick={() => onRatingFilterChange(rating)}
            >
              {[...Array(rating)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={selectedRating === rating ? '#fbbf24' : '#d1d5db'}
                  color={selectedRating === rating ? '#fbbf24' : '#9ca3af'}
                />
              ))}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter - Beautiful Chips */}
      {categoryList.length > 0 && (
        <div className="filter-section">
          <div className="filter-label">
            <Folder size={16} />
            <span>Filter by Category</span>
          </div>
          <div className="category-filter-chips">
            <button
              className={`category-chip ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => onCategoryFilterChange('')}
            >
              All Categories
            </button>
            {categoryList.map((category) => (
              <button
                key={category}
                className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => onCategoryFilterChange(category)}
              >
                <Folder size={14} />
                {category}
                {selectedCategory === category && (
                  <X size={14} className="chip-close" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Count */}
      <div className="media-count">
        Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> media files
      </div>
    </div>
  );
}