'use client';

import Link from 'next/link';
import { Heart, Video, Image as ImageIcon, Edit2, Check, X } from 'lucide-react';
import { MediaWithCustomName } from '@/types';
import { useState } from 'react';

interface MediaCardProps {
  media: MediaWithCustomName;
  onToggleFavorite: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
}

export default function MediaCard({ media, onToggleFavorite, onUpdateName }: MediaCardProps) {
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
              {media.isVideo ? <Video size={48} /> : <ImageIcon size={48} />}
            </div>
          )}
          <div className="card-overlay">
            <span className="view-text">Lihat Detail</span>
          </div>
        </div>
        <div className="media-badge">
          {media.isVideo ? (
            <>
              <Video size={14} />
              Video
            </>
          ) : (
            <>
              <ImageIcon size={14} />
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
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="edit-action-btn cancel"
                  title="Batal"
                >
                  <X size={16} />
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
                <Edit2 size={16} />
              </button>
            </>
          )}
        </div>

        <div className="card-footer">
          <span className="file-size">{media.size}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(media.id);
            }}
            className={`favorite-btn ${media.isFavorite ? 'active' : ''}`}
            title={media.isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Heart size={18} fill={media.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}
