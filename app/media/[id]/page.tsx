'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Edit2, Check, X, Download, ExternalLink } from 'lucide-react';
import { MediaFile } from '@/types';
import { useLocalStorage } from '@/lib/useLocalStorage';
import MediaPlayer from '@/components/MediaPlayer';

export default function MediaDetailPage({ params }: { params: { id: string } }) {
  const [media, setMedia] = useState<MediaFile & { webViewLink?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  const { favorites, customNames, toggleFavorite, setCustomName, isLoaded } = useLocalStorage();
  const router = useRouter();

  useEffect(() => {
    fetchMediaDetail();
  }, [params.id]);

  const fetchMediaDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/media/${params.id}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch media');
      }

      setMedia(result.data);
      setEditName(customNames[result.data.id] || result.data.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !isLoaded) {
    return (
      <div className="detail-container">
        <div className="detail-loading">
          <div className="loading-spinner"></div>
          <p>Memuat media...</p>
        </div>
      </div>
    );
  }

  if (error || !media) {
    return (
      <div className="detail-container">
        <div className="detail-error">
          <h2>Terjadi Kesalahan</h2>
          <p>{error || 'Media tidak ditemukan'}</p>
          <Link href="/" className="back-link">
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(media.id);
  const displayName = customNames[media.id] || media.name;

  const handleSaveName = () => {
    setCustomName(media.id, editName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(customNames[media.id] || media.name);
    setIsEditing(false);
  };

  return (
    <div className="detail-container">
      <div className="detail-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={20} />
          Kembali
        </Link>

        <div className="detail-actions">
          {media.webContentLink && (
            <a
              href={media.webContentLink}
              download
              className="action-btn"
              title="Download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={20} />
            </a>
          )}
          {media.webViewLink && (
            <a
              href={media.webViewLink}
              className="action-btn"
              title="Buka di Google Drive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
            </a>
          )}
          <button
            onClick={() => toggleFavorite(media.id)}
            className={`action-btn ${isFavorite ? 'favorite-active' : ''}`}
            title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="detail-content">
        <MediaPlayer media={media} />

        <div className="detail-info">
          <div className="info-row">
            {isEditing ? (
              <div className="edit-name-section">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="detail-edit-input"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <div className="edit-actions">
                  <button onClick={handleSaveName} className="edit-btn save" title="Simpan">
                    <Check size={20} />
                  </button>
                  <button onClick={handleCancelEdit} className="edit-btn cancel" title="Batal">
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="name-section">
                <h1 className="media-title">{displayName}</h1>
                <button onClick={() => setIsEditing(true)} className="edit-icon-btn" title="Edit nama">
                  <Edit2 size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="info-details">
            <div className="info-item">
              <span className="info-label">Tipe</span>
              <span className="info-value">{media.isVideo ? 'Video' : 'Foto'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Format</span>
              <span className="info-value">{media.mimeType}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Ukuran</span>
              <span className="info-value">{media.size}</span>
            </div>
            {customNames[media.id] && (
              <div className="info-item">
                <span className="info-label">Nama Asli</span>
                <span className="info-value original-name">{media.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
