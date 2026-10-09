import React from 'react';
import EmptyState from '../components/EmptyState';

export default function Partners() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-slate-400">Início / Parceiros</p>
        <h2 className="text-2xl font-extrabold text-brand-900">Parceiros</h2>
      </div>

      <div className="rounded-xl2 bg-white shadow-card"><EmptyState message="Ainda não há parceiros cadastrados no backend." /></div>
    </div>
  );
}
