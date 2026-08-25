import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';

export default function MaterialDidatico() {
  return (
    <div>
      <Breadcrumb items={['Início', 'Material didático']} />

      <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
        <div className="bg-brand-400 text-white px-5 py-3 font-bold text-sm">Arquivos</div>
        <EmptyState message="Nenhum material encontrado" />
      </div>
    </div>
  );
}
