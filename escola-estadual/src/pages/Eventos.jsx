import { useMemo, useState } from 'react';
import { Plus, Search, MapPin, Clock, Users, UserCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import FooterStats from '../components/FooterStats.jsx';
import { useEvents } from '../context/EventsContext.jsx';
import { DEFAULT_FOOTER_STATS } from '../data/pages.js';

const MONTH_NAMES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d} ${MONTH_NAMES[Number(m) - 1]}. ${y}`;
}

export default function Eventos() {
  const { eventos } = useEvents();
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      [...eventos]
        .sort((a, b) => a.data.localeCompare(b.data))
        .filter((e) => e.titulo.toLowerCase().includes(query.trim().toLowerCase())),
    [eventos, query]
  );

  return (
    <>
      <PageHeader
        eyebrow="Comunicação / Agenda institucional"
        title="Eventos"
        description="Atividades, campanhas e cerimônias oficiais promovidas pela escola."
        actionLabel="Novo evento"
        actionIcon={Plus}
        onAction={() => alert('Use o Calendário letivo para criar um evento em uma data específica.')}
      />

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">{filtered.length} evento(s) institucional(is)</p>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por nome..."
            className="input pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((e) => (
          <article key={e.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-brand-action/10 px-2.5 py-1 text-[11px] font-semibold text-brand-action">
                  {e.tipo}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-brand-navy">{e.titulo}</h3>
              </div>
              <StatusBadge status={e.status} />
            </div>

            <p className="text-sm text-slate-500">{e.descricao}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {formatDate(e.data)}{e.horario ? ` · ${e.horario}` : ''}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {e.local}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                {e.publico}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                {e.responsavel}
              </span>
            </div>

            {e.participantes !== null && (
              <div className="rounded-lg bg-surface-muted px-3 py-2 text-xs font-semibold text-slate-600">
                {e.participantes} participante(s) confirmado(s)/estimado(s)
              </div>
            )}
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-slate-400">Nenhum evento encontrado para “{query}”.</p>
        )}
      </div>

      <FooterStats items={DEFAULT_FOOTER_STATS} />
    </>
  );
}
