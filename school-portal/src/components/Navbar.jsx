import React from 'react';
import { Menu, GraduationCap } from 'lucide-react';

/**
 * Navbar fixa no topo. Em telas mobile exibe o botão de menu que abre a Sidebar.
 * Em telas desktop a Sidebar já fica sempre visível, então o botão de menu
 * fica oculto (ver classes "md:hidden").
 */
export default function Navbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-brand-400 text-white px-4 py-3 shadow-card md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden rounded-lg p-1.5 hover:bg-white/10 active:bg-white/20 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
        <GraduationCap size={22} className="opacity-90" />
        <h1 className="text-lg font-bold tracking-wide">{title}</h1>
      </div>
    </header>
  );
}
