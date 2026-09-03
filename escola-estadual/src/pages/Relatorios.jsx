import { Download, Activity, FileBarChart, ClipboardCheck, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const TOP_STATS = [
  { icon: Activity, label: 'Frequência escolar', value: '93,6%', delta: '+4,2%', trend: 'up', caption: 'acima da meta' },
  { icon: FileBarChart, label: 'Rendimento bimestral', value: '7,8', delta: '+4,2%', trend: 'up', caption: 'média geral' },
  { icon: ClipboardCheck, label: 'Pendências', value: '18', delta: '-12%', trend: 'down', caption: 'matrículas' },
];

export default function Relatorios() {
  return (
    <>
      <PageHeader
        eyebrow="Acompanhamento / Indicadores"
        title="Relatórios"
        description="Leia a operação da escola com dados prontos para decisão."
        actionLabel="Gerar relatório"
        actionIcon={FileBarChart}
        onAction={() => alert('Ação "Gerar relatório" ainda não implementada neste protótipo.')}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TOP_STATS.map(({ icon: Icon, label, value, delta, trend, caption }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-action/10 text-brand-action">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-brand-navy">{value}</span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  trend === 'up' ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {delta}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{caption}</p>
          </div>
        ))}
      </div>

      {/* Banner de relatório recomendado */}
      <div className="mt-5 flex flex-col justify-between gap-6 rounded-2xl bg-brand-navy p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300">Relatório recomendado</p>
          <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold sm:text-3xl">
            Acompanhar alunos em risco de infrequência
          </h2>
          <p className="mt-3 max-w-lg text-sm text-indigo-100">
            Cruza presença, etapa e histórico de contato com responsáveis para apontar onde a equipe pode agir esta
            semana.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-action px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-blue-600"
        >
          <Download className="h-4 w-4" />
          Gerar PDF
        </button>
      </div>

      {/* Relatórios recentes */}
      <section className="mt-5 rounded-2xl border border-slate-200 bg-surface-card p-6 shadow-card">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Relatórios recentes</p>
            <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">Central de indicadores</h2>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-surface-muted">
            Ver notas
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="mt-5 divide-y divide-slate-100">
          {[
            { title: 'Boletim consolidado · 2º bimestre', when: 'Gerado há 2 dias' },
            { title: 'Presença semanal por turma', when: 'Gerado há 4 dias' },
            { title: 'Panorama de matrículas 2026', when: 'Gerado há 1 semana' },
          ].map((r) => (
            <li key={r.title} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-sm font-medium text-slate-800">{r.title}</p>
                <p className="text-xs text-slate-400">{r.when}</p>
              </div>
              <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand-action hover:underline">
                Abrir
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
