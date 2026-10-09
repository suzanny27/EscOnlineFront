import React from 'react';

const TONE_MAP = {
  publicado: 'bg-indigo-500',
  confirmado: 'bg-indigo-500',
  ativa: 'bg-emerald-500',
  ativo: 'bg-emerald-500',
  concluída: 'bg-emerald-500',
  concluida: 'bg-emerald-500',
  concluído: 'bg-emerald-500',
  concluido: 'bg-emerald-500',
  rascunho: 'bg-slate-400',
  pendente: 'bg-amber-500',
  'em análise': 'bg-slate-400',
  'em analise': 'bg-slate-400',
  'em revisão': 'bg-slate-400',
  'em revisao': 'bg-slate-400',
  'em andamento': 'bg-sky-500',
  'em divulgação': 'bg-slate-400',
  'em divulgacao': 'bg-slate-400',
  agendado: 'bg-sky-500',
  planejado: 'bg-slate-400',
};

export default function StatusBadge({ status }) {
  const dot = TONE_MAP[status.toLowerCase()] ?? 'bg-slate-400';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-2 py-1 font-mono text-[11px] font-medium uppercase text-slate-700">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}