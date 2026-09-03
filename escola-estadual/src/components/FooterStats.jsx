import { ArrowUpRight } from 'lucide-react';

/**
 * Grade de 3 cartões de estatística exibida ao final da maioria das
 * páginas (ex.: Cadastros / Planejamento / Eventos na visão geral, ou
 * variações contextuais como Turmas / Matrículas / Notas em Cadastros).
 */
export default function FooterStats({ items }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map(({ icon: Icon, label, value, caption }) => (
        <button
          key={label}
          type="button"
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-surface-card p-5 text-left shadow-card transition-shadow hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-action/10 text-brand-action">
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm text-slate-500">{label}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-action" />
            </span>
            <span className="mt-1 block font-display text-2xl font-semibold text-brand-navy">{value}</span>
            <span className="text-xs text-slate-400">{caption}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
