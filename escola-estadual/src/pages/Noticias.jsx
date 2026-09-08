import { useMemo, useState } from 'react';
import { Plus, Search, CalendarDays } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import FooterStats from '../components/FooterStats.jsx';
import { NOTICIAS_INICIAIS } from '../data/schoolData.js';
import { DEFAULT_FOOTER_STATS } from '../data/pages.js';

export default function Noticias() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => NOTICIAS_INICIAIS.filter((n) => n.titulo.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  );

  return (
    <>
      <PageHeader
        eyebrow="Comunicação / Notícias"
        title="Notícias escolares"
        description="Canal oficial de comunicação da escola com famílias e comunidade escolar."
        actionLabel="Nova notícia"
        actionIcon={Plus}
        onAction={() => alert('Ação "Nova notícia" ainda não implementada neste protótipo.')}
      />

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">{filtered.length} comunicado(s)</p>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por título..."
            className="input pl-9"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((n) => (
          <article key={n.id} className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-action/10 px-2.5 py-1 text-[11px] font-semibold text-brand-action">
                    {n.categoria}
                  </span>
                  <StatusBadge status={n.status} />
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-navy">{n.titulo}</h3>
                <p className="mt-1 text-sm text-slate-500">{n.resumo}</p>
              </div>
              <button className="shrink-0 self-start rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-surface-muted">
                Abrir
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Publicado em {n.dataPublicacao}
              </span>
              {n.dataRelacionada && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Data relacionada: {n.dataRelacionada}
                </span>
              )}
              <span>Público: {n.publico}</span>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">Nenhuma notícia encontrada para “{query}”.</p>
        )}
      </div>

      <FooterStats items={DEFAULT_FOOTER_STATS} />
    </>
  );
}
