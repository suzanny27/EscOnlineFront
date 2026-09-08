import React from 'react';
import { Menu, GraduationCap } from 'lucide-react';
import { menuItems } from './Sidebar';

export default function Navbar({ title, onMenuClick, activePage, onNavigate, onLogout }) {
  return (
    <header className="sticky top-0 z-20 bg-white shadow-card">
      <div className="flex items-center justify-between px-4 py-3 md:px-8 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden rounded-lg p-1.5 hover:bg-slate-100 active:bg-slate-200 transition-colors text-slate-700"
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
          <GraduationCap size={22} className="text-brand-400" />
          <h1 className="text-lg font-bold tracking-wide text-slate-800">{title}</h1>
          <button
            onClick={onLogout}
            className="ml-3 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            Trocar perfil
          </button>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-1 px-8 overflow-x-auto bg-slate-50 border-b border-slate-100">
        {menuItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activePage === key
                ? 'border-brand-400 text-brand-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
