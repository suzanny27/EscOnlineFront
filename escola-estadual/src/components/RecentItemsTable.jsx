import { useMemo, useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

/**
 * Tabela "Itens recentes" reutilizada em Notícias, Eventos, Matrículas,
 * Turmas e Planejamento. Recebe `columns` (rótulos do cabeçalho)
 * e `rows` (dados já formatados) e filtra localmente pelo campo `title`.
 */
export default function RecentItemsTable({
  sectionLabel = 'Visão geral',
  heading = 'Itens recentes',
  columns = ['Registro', 'Contexto', 'Responsável / Local', 'Status', 'Ação'],
  rows,
  searchPlaceholder = 'Filtrar por nome...',
  actionLabel = 'Abrir',
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    return rows.filter((row) => row.title.toLowerCase().includes(query.trim().toLowerCase()));
  }, [rows, query]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">{sectionLabel}</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">{heading}</h2>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-action"
          />
        </div>
      </div>

      {/* Tabela em telas médias e maiores */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {columns.map((col) => (
                <th key={col} className="pb-3 pr-4 font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.title} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                <td className="py-3.5 pr-4">
                  <p className="font-medium text-slate-800">{row.title}</p>
                  <p className="text-xs text-slate-400">{row.subtitle}</p>
                </td>
                <td className="py-3.5 pr-4 text-slate-500">{row.context}</td>
                <td className="py-3.5 pr-4 text-slate-500">{row.owner}</td>
                <td className="py-3.5 pr-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-3.5">
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand-action hover:underline">
                    {actionLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-slate-400">
                  Nenhum registro encontrado para “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cartões empilhados em mobile */}
      <ul className="space-y-3 md:hidden">
        {filtered.map((row) => (
          <li key={row.title} className="rounded-xl border border-slate-100 p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-slate-800">{row.title}</p>
                <p className="text-xs text-slate-400">{row.subtitle}</p>
              </div>
              <StatusBadge status={row.status} />
            </div>
            <p className="text-xs text-slate-500">{row.context}</p>
            <p className="mb-3 text-xs text-slate-500">{row.owner}</p>
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand-action">
              {actionLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-8 text-center text-sm text-slate-400">Nenhum registro encontrado para “{query}”.</li>
        )}
      </ul>
    </section>
  );
}
