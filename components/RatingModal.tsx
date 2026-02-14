'use client';

import { Star, X } from 'lucide-react';
import { useState } from 'react';

interface RatingModalProps {
  isOpen: boolean;
  currentRating?: number;
  onClose: () => void;
  onRate: (rating: number) => void;
  mediaName: string;
}

export default function RatingModal({ 
  isOpen, 
  currentRating = 0,
  onClose, 
  onRate,
  mediaName 
}: RatingModalProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  const handleRate = (rating: number) => {
    onRate(rating);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Beri Rating</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-media-name">{mediaName}</p>
          <p className="modal-instruction">Pilih rating 1-5 bintang:</p>
          
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className="star-button"
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRate(rating)}
              >
                <Star 
                  size={48}
                  fill={(hoveredRating || currentRating) >= rating ? '#fbbf24' : 'none'}
                  color={(hoveredRating || currentRating) >= rating ? '#fbbf24' : '#6b7280'}
                />
              </button>
            ))}
          </div>

          {currentRating > 0 && (
            <button 
              className="remove-rating-btn"
              onClick={() => handleRate(0)}
            >
              Hapus Rating
            </button>
          )}
        </div>
      </div>
    </div>
  );
}