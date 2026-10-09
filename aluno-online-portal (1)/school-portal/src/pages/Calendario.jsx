import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';

const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export default function Calendario() {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <Breadcrumb items={['Início', 'Calendário']} />

      <div className="bg-white rounded-xl2 shadow-card p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-slate-700">Calendário</h2>
          <span className="text-sm font-medium text-slate-600">{currentYear}</span>
        </div>

        <div className="flex gap-1 overflow-x-auto mb-5 border-b border-slate-100 pb-1">
          {months.map((m, i) => (
            <button
              key={m}
              onClick={() => setActiveMonth(i)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                activeMonth === i
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <EmptyState message={`O backend ainda não fornece eventos para ${months[activeMonth]} de ${currentYear}.`} />
        </div>
      </div>
    </div>
  );
}
