import React from 'react';
import EmptyState from '../../components/EmptyState';

export default function Parceiros() {
  return (
    <div className="rounded-xl2 bg-white shadow-card"><EmptyState message="Ainda não há parceiros cadastrados no backend." /></div>
  );
}