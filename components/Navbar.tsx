'use client';

import Link from 'next/link';
import { Film, Settings } from 'lucide-react';

interface NavbarProps {
  onOpenSettings?: () => void;
}

export default function Navbar({ onOpenSettings }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          <Film size={28} />
          <span>Media Gallery</span>
        </Link>
        
        <div className="navbar-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          {onOpenSettings && (
            <button onClick={onOpenSettings} className="nav-link-btn">
              <Settings size={18} />
              Settings
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}