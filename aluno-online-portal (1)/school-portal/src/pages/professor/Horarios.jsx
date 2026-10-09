import React from 'react';
import EmptyState from '../../components/EmptyState';

export default function Horario() {
  return (
    <div className="rounded-xl2 bg-white shadow-card"><EmptyState message="O backend ainda não fornece horários de professor." /></div>
  );
}