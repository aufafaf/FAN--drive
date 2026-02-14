

'use client';

import Link from 'next/link';
import { Film } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          <Film size={28} />
          <span>Media Gallery</span>
        </Link>
        
        <div className="navbar-links">
          <Link href="/" className="nav-link">
            Beranda
          </Link>
        </div>
      </div>
    </nav>
  );
}