import React from 'react';
import { Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';

export default function Horario() {
  return (
    <div>
      <Breadcrumb items={['Início', 'Horários']} />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="flex items-center gap-2 text-brand-700 font-bold">
          <Clock size={18} />
          {new Intl.DateTimeFormat('pt-BR').format(new Date())}
        </span>
        <span className="text-sm text-slate-500">{new Date().getFullYear()}</span>
      </div>

      <div className="rounded-xl2 bg-white shadow-card">
        <EmptyState message="O backend ainda não fornece horários de aula." />
      </div>
    </div>
  );
}
