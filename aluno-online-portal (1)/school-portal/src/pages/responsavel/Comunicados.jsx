import React from 'react';
import EmptyState from '../../components/EmptyState';

export default function Comunicados() {
  return <div className="rounded-xl2 bg-white shadow-card"><EmptyState message="Ainda não há endpoint de comunicados no backend." /></div>;
}