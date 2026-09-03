import { useMemo, useState } from 'react';
import { Plus, Search, ArrowUpRight, UserPlus, ArrowLeftRight, Repeat } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import FooterStats from '../components/FooterStats.jsx';
import NovaMatriculaModal from '../components/NovaMatriculaModal.jsx';
import { useMatriculas } from '../context/MatriculasContext.jsx';
import { getCurso, getTurma } from '../data/schoolData.js';
import { DEFAULT_FOOTER_STATS } from '../data/pages.js';

const TIPO_ICON = { Nova: UserPlus, Transferência: ArrowLeftRight, Rematrícula: Repeat };

export default function Matriculas() {
  const { matriculas, addMatricula } = useMatriculas();
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => matriculas.filter((m) => m.aluno.toLowerCase().includes(query.trim().toLowerCase())),
    [matriculas, query]
  );

  return (
    <>
      <PageHeader
        eyebrow="Gestão acadêmica / Matrículas"
        title="Matrículas"
        description="Acompanhe inscrições, renovações, transferências e pendências documentais."
        actionLabel="Nova matrícula"
        actionIcon={Plus}
        onAction={() => setModalOpen(true)}
      />

      <section className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Visão geral</p>
            <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">Matrículas em andamento</h2>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar por aluno..."
              className="input pl-9"
            />
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-3 pr-4">Aluno</th>
                <th className="pb-3 pr-4">Tipo</th>
                <th className="pb-3 pr-4">Curso · Turma</th>
                <th className="pb-3 pr-4">Origem / Pendências</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const Icon = TIPO_ICON[m.tipo] ?? UserPlus;
                const curso = getCurso(m.cursoId);
                const turma = getTurma(m.turmaId) ?? { nome: m.turmaNome };
                return (
                  <tr key={m.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="py-3.5 pr-4">
                      <p className="font-medium text-slate-800">{m.aluno}</p>
                      <p className="text-xs text-slate-400">{m.id}</p>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <Icon className="h-3.5 w-3.5 text-brand-action" />
                        {m.tipo}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-500">
                      {(curso?.nome ?? m.cursoNome) || '—'} · {turma?.nome ?? '—'}
                    </td>
                    <td className="py-3.5 pr-4 text-slate-500">
                      {m.tipo === 'Transferência' && m.escolaOrigem ? (
                        <span className="block text-xs text-slate-500">Vindo de: {m.escolaOrigem}</span>
                      ) : null}
                      {m.documentosPendentes.length > 0 ? (
                        <span className="block text-xs text-amber-600">
                          {m.documentosPendentes.length} documento(s) pendente(s)
                        </span>
                      ) : (
                        <span className="block text-xs text-emerald-600">Documentação completa</span>
                      )}
                    </td>
                    <td className="py-3.5 pr-4">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="py-3.5">
                      <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand-action hover:underline">
                        Abrir
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ul className="space-y-3 md:hidden">
          {filtered.map((m) => {
            const curso = getCurso(m.cursoId);
            const turma = getTurma(m.turmaId) ?? { nome: m.turmaNome };
            return (
              <li key={m.id} className="rounded-xl border border-slate-100 p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-800">{m.aluno}</p>
                    <p className="text-xs text-slate-400">{m.tipo} · {m.id}</p>
                  </div>
                  <StatusBadge status={m.status} />
                </div>
                <p className="text-xs text-slate-500">{(curso?.nome ?? m.cursoNome)} · {turma?.nome}</p>
                {m.tipo === 'Transferência' && m.escolaOrigem && (
                  <p className="text-xs text-slate-500">Vindo de: {m.escolaOrigem}</p>
                )}
                <p className={`text-xs ${m.documentosPendentes.length ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {m.documentosPendentes.length ? `${m.documentosPendentes.length} documento(s) pendente(s)` : 'Documentação completa'}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <FooterStats items={DEFAULT_FOOTER_STATS} />

      {modalOpen && (
        <NovaMatriculaModal
          onClose={() => setModalOpen(false)}
          onSubmit={(matricula) => addMatricula(matricula)}
        />
      )}
    </>
  );
}
