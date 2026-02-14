'use client';

import { X, Download, Upload, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
  onImport: (data: string) => void;
  onClearAll: () => void;
}

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  onExport,
  onImport,
  onClearAll
}: SettingsModalProps) {
  const [importText, setImportText] = useState('');
  const [showImportForm, setShowImportForm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  const handleImport = () => {
    if (importText.trim()) {
      onImport(importText);
      setImportText('');
      setShowImportForm(false);
    }
  };

  const handleClearAll = () => {
    onClearAll();
    setShowClearConfirm(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <SettingsIcon size={20} />
            <h3>Settings & Sync</h3>
          </div>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="settings-section">
            <h4 className="settings-section-title">Data Synchronization</h4>
            <p className="settings-section-description">
              Export your ratings and categories to sync across devices (HP, Laptop, etc)
            </p>

            <div className="settings-actions">
              <button 
                className="settings-btn primary"
                onClick={onExport}
              >
                <Download size={18} />
                Export Data
              </button>

              {!showImportForm ? (
                <button 
                  className="settings-btn secondary"
                  onClick={() => setShowImportForm(true)}
                >
                  <Upload size={18} />
                  Import Data
                </button>
              ) : (
                <div className="import-form">
                  <textarea
                    placeholder="Paste exported data here..."
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    className="import-textarea"
                    rows={6}
                  />
                  <div className="form-actions">
                    <button onClick={handleImport} className="settings-btn primary">
                      Import
                    </button>
                    <button 
                      onClick={() => {
                        setShowImportForm(false);
                        setImportText('');
                      }} 
                      className="settings-btn secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="settings-section danger-zone">
            <h4 className="settings-section-title">Danger Zone</h4>
            <p className="settings-section-description">
              Clear all ratings, categories, and custom names. This cannot be undone.
            </p>

            {!showClearConfirm ? (
              <button 
                className="settings-btn danger"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 size={18} />
                Clear All Data
              </button>
            ) : (
              <div className="confirm-clear">
                <p className="confirm-text">Are you sure? This will delete everything!</p>
                <div className="form-actions">
                  <button onClick={handleClearAll} className="settings-btn danger">
                    Yes, Delete All
                  </button>
                  <button 
                    onClick={() => setShowClearConfirm(false)} 
                    className="settings-btn secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="settings-info">
            <h5>How to sync data across devices:</h5>
            <ol>
              <li>On your HP: Click "Export Data" → Copy the text</li>
              <li>On your Laptop: Click "Import Data" → Paste the text → Import</li>
              <li>Done! Your ratings and categories are now synced 🎉</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}