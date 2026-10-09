import React from 'react';
import EmptyState from '../../components/EmptyState';

export default function Boletim() {
  return <div className="rounded-xl2 bg-white shadow-card"><EmptyState message="O backend ainda não autentica responsáveis nem identifica seus alunos vinculados." /></div>;
}