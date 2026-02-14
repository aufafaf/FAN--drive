'use client';

import Link from 'next/link';
import { Star, Video, Image as ImageIcon, Edit2, Check, X, Folder } from 'lucide-react';
import { MediaWithCustomName } from '@/types';
import { useState } from 'react';

interface MediaCardProps {
  media: MediaWithCustomName;
  onOpenRating: (media: MediaWithCustomName) => void;
  onOpenCategory: (media: MediaWithCustomName) => void;
  onUpdateName: (id: string, name: string) => void;
}

export default function MediaCard({ media, onOpenRating, onOpenCategory, onUpdateName }: MediaCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(media.customName || media.name);

  const displayName = media.customName || media.name;

  const handleSaveName = () => {
    onUpdateName(media.id, editName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(media.customName || media.name);
    setIsEditing(false);
  };

  return (
    <div className="media-card">
      <Link href={`/media/${media.id}`} className="card-image-wrapper">
        <div className="card-image">
          {media.thumbnailLink ? (
            <img src={media.thumbnailLink} alt={displayName} loading="lazy" />
          ) : (
            <div className="placeholder-icon">
              {media.isVideo ? <Video size={32} /> : <ImageIcon size={32} />}
            </div>
          )}
          <div className="card-overlay">
            <span className="view-text">Lihat Detail</span>
          </div>
        </div>
        <div className="media-badge">
          {media.isVideo ? (
            <>
              <Video size={12} />
              Video
            </>
          ) : (
            <>
              <ImageIcon size={12} />
              Foto
            </>
          )}
        </div>
      </Link>

      <div className="card-content">
        <div className="card-title-row">
          {isEditing ? (
            <div className="edit-name-wrapper">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="edit-name-input"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
              />
              <div className="edit-actions">
                <button
                  onClick={handleSaveName}
                  className="edit-action-btn save"
                  title="Simpan"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="edit-action-btn cancel"
                  title="Batal"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="card-title" title={displayName}>
                {displayName}
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="edit-btn"
                title="Edit nama"
              >
                <Edit2 size={14} />
              </button>
            </>
          )}
        </div>

        {/* Rating Stars Display */}
        {media.rating && media.rating > 0 && (
          <div className="card-rating-display">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < media.rating! ? '#fbbf24' : 'none'}
                color={i < media.rating! ? '#fbbf24' : '#4b5563'}
              />
            ))}
          </div>
        )}

        {/* Category Display */}
        {media.category && (
          <div className="card-category-display">
            <Folder size={12} />
            <span>{media.category}</span>
          </div>
        )}

        <div className="card-footer">
          <span className="file-size">{media.size}</span>
          <div className="card-actions">
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenCategory(media);
              }}
              className="action-btn-small"
              title="Pilih kategori"
            >
              <Folder size={16} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenRating(media);
              }}
              className={`action-btn-small ${media.rating ? 'has-rating' : ''}`}
              title="Beri rating"
            >
              <Star size={16} fill={media.rating ? '#fbbf24' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}