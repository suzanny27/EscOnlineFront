import React from 'react';

/**
 * Card genérico com cabeçalho colorido opcional (usado nos widgets
 * "Calendário Letivo", "Últimas Notícias", "Canais de Atendimento" etc.)
 */
export default function Card({ title, children, className = '', headerClassName = '' }) {
  return (
    <div
      className={`bg-white rounded-xl2 shadow-card overflow-hidden flex flex-col ${className}`}
    >
      {title && (
        <div
          className={`px-5 py-3 bg-brand-400 text-white text-sm font-bold tracking-wide ${headerClassName}`}
        >
          {title}
        </div>
      )}
      <div className="p-5 flex-1">{children}</div>
    </div>
  );
}
