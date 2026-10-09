import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';

export default function Noticias() {
  return (
    <div>
      <Breadcrumb items={['Início', 'Notícias']} />

      <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 font-bold text-sm">Notícias</div>
        <EmptyState message="Ainda não há notícias disponíveis no backend." />
      </div>
    </div>
  );
}
