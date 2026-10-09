import React from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ title, onMenuClick }) {
  return (
    <header className="portal-navbar relative sticky top-0 z-20 bg-brand-900 border-b border-white/10 flex items-center gap-3 px-4 py-4 md:px-8">
      <button
        onClick={onMenuClick}
        className="md:hidden rounded-lg p-1.5 hover:bg-white/10 text-white transition-colors"
        aria-label="Abrir menu"
      >
        <Menu size={22} />
      </button>
      <h1 className="text-lg font-bold text-white">{title}</h1>
    </header>
  );
}
