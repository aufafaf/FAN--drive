'use client';

import { X, Plus, Folder } from 'lucide-react';
import { useState } from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  currentCategory?: string;
  categoryList: string[];
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onAddCategory: (categoryName: string) => void;
  mediaName: string;
}

export default function CategoryModal({ 
  isOpen, 
  currentCategory,
  categoryList,
  onClose, 
  onSelectCategory,
  onAddCategory,
  mediaName 
}: CategoryModalProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
      setShowAddForm(false);
    }
  };

  const handleSelectCategory = (category: string) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Pilih Kategori</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-media-name">{mediaName}</p>
          
          {categoryList.length > 0 ? (
            <div className="category-list">
              {categoryList.map((category) => (
                <button
                  key={category}
                  className={`category-item ${currentCategory === category ? 'active' : ''}`}
                  onClick={() => handleSelectCategory(category)}
                >
                  <Folder size={18} />
                  <span>{category}</span>
                  {currentCategory === category && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          ) : (
            <p className="empty-categories">Belum ada kategori. Buat kategori baru di bawah.</p>
          )}

          {currentCategory && (
            <button 
              className="remove-category-btn"
              onClick={() => handleSelectCategory('')}
            >
              Hapus dari Kategori
            </button>
          )}

          <div className="add-category-section">
            {!showAddForm ? (
              <button 
                className="show-add-form-btn"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={18} />
                Buat Kategori Baru
              </button>
            ) : (
              <div className="add-category-form">
                <input
                  type="text"
                  placeholder="Nama kategori..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddCategory();
                    if (e.key === 'Escape') {
                      setShowAddForm(false);
                      setNewCategoryName('');
                    }
                  }}
                  autoFocus
                  className="category-input"
                />
                <div className="form-actions">
                  <button onClick={handleAddCategory} className="add-btn">
                    Tambah
                  </button>
                  <button 
                    onClick={() => {
                      setShowAddForm(false);
                      setNewCategoryName('');
                    }} 
                    className="cancel-btn"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}