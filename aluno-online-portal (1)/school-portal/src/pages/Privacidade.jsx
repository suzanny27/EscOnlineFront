import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

export default function Privacidade() {
  return (
    <div>
      <Breadcrumb items={['Início', 'Políticas de Privacidade']} />

      <div className="bg-white rounded-xl2 shadow-card p-6 md:p-8 space-y-4 text-sm text-slate-600 leading-relaxed">
        <h2 className="text-lg font-bold text-brand-900">Políticas de Privacidade</h2>
        <p>O conteúdo da política ainda não foi fornecido pela equipe responsável.</p>
      </div>
    </div>
  );
}
