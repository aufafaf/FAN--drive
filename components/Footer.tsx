'use client';

import { Github, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Media Gallery</h4>
            <p>Koleksi video dan foto dari Google Drive</p>
          </div>
          
          <div className="footer-section">
            <h4>Fitur</h4>
            <ul>
              <li>Rating 1-5 bintang</li>
              <li>Kategori custom</li>
              <li>Pencarian & filter</li>
              <li>Custom naming</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Teknologi</h4>
            <ul>
              <li>Next.js 14+</li>
              <li>TypeScript</li>
              <li>Google Drive API</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Media Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}